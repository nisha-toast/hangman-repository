/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

// Create the GameContext
const GameContext = createContext();

// Custom hook to access the context
export const useGame = () => {
  return useContext(GameContext);
};

// Provider component that holds the game state
export const GameProvider = ({ children }) => {
  const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
  const buildUrl = (path) => (API_BASE ? `${API_BASE}${path}` : path);
  const [progress, setProgress] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [hangmanStage, setHangmanStage] = useState('');
  const [message, setMessage] = useState('');
  const [usedLetters, setUsedLetters] = useState(new Set());
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [correctWord, setCorrectWord] = useState(false);

  // No global initial fetch here — state is loaded per-session via loadGame(sessionId)

  const loadGame = async (sessionId) => {
    try {
      const res = await fetch(buildUrl(`/api/hangman/games/${sessionId}/status`));
      const data = await res.json();
      setProgress(data.progress);
      setAttemptsLeft(data.attemptsLeft);
      setGameOver(data.gameOver);
      setHangmanStage(data.hangmanStateFigure);
      setScore(data.score);
      setGameWon(data.gameWon);
      setCorrectWord(data.correctWord);
      if (data.guessedLetters) setUsedLetters(new Set(data.guessedLetters));
    } catch (error) {
      console.error('Error loading game state:', error);
    }
  };

  const handleGuess = async (sessionId, letter) => {
    // Guard clauses
    if (usedLetters.has(letter) || gameOver || correctWord) return;

    setUsedLetters(prev => {
      const next = new Set(prev);
      next.add(letter);
      return next;
    });

    // Give immediate feedback to the user
    setMessage(`Guessing ${letter}...`);

    try {

      const res = await fetch(buildUrl(`/api/hangman/games/${sessionId}/guess?guess=${letter}`), { method: 'POST' });

      const serverMessage = await res.text();
      if (serverMessage) setMessage(serverMessage);

      // Refresh status in background and reconcile state when it arrives
      fetch(buildUrl(`/api/hangman/games/${sessionId}/status`))
        .then(response => response.json())
        .then(data => {
          setProgress(data.progress);
          setAttemptsLeft(data.attemptsLeft);
          setGameOver(data.gameOver);
          setHangmanStage(data.hangmanStateFigure);
          setUsedLetters(new Set(data.guessedLetters));
          setScore(data.score);
          setGameWon(data.gameWon);
          setCorrectWord(data.correctWord);
        })
        .catch((error) => {
          console.error('Error fetching status after guess:', error);
        });
    } catch (error) {
      console.error('Error sending guess:', error);
      setMessage('Network error while sending guess. Please try again.');
      setUsedLetters(prev => {
        const next = new Set(prev);
        next.delete(letter);
        return next;
      });
    }
  };

  const nextWord = (sessionId) => {
    fetch(buildUrl(`/api/hangman/games/${sessionId}/next`), { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        setProgress(data.progress);
        setAttemptsLeft(10);
        setGameOver(data.gameOver);
        setHangmanStage(data.hangmanStateFigure);
        setMessage("Here's the next word.");
        setUsedLetters(new Set(data.guessedLetters));
        setCorrectWord(data.correctWord);
        setGameWon(data.gameWon);
      })
      .catch((error) => console.error("Error getting next word:", error));
  };

  const startNewGame = async (sessionId) => {
    try {
      await fetch(buildUrl(`/api/hangman/games/${sessionId}/reset`), { method: 'POST' });
      // reload state
      await loadGame(sessionId);
      setGameWon(false);
      setCorrectWord(false);
      setMessage('New game started! Good luck!');
    } catch (err) {
      console.error('Error starting new game:', err);
    }
  };

  return (
    <GameContext.Provider value={{
        progress, attemptsLeft, gameOver, hangmanStage, message,
        usedLetters, score, gameWon, correctWord,
        handleGuess, nextWord, startNewGame, loadGame
    }}>
      {children}
    </GameContext.Provider>
  );
};