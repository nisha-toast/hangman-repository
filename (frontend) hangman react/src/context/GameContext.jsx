/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';

// Create the GameContext
const GameContext = createContext();

// Custom hook to access the context
export const useGame = () => {
  return useContext(GameContext);
};


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

  useEffect(() => {
    fetch(buildUrl('/api/hangman/status'))
      .then(response => response.json())
      .then(data => {
        setProgress(data.progress);
        setAttemptsLeft(data.attemptsLeft);
        setGameOver(data.gameOver);
        setHangmanStage(data.hangmanFigureState);
        setScore(data.score);
        setGameWon(data.gameWon);
        setCorrectWord(data.correctWord);

        if (data.guessedLetters) {
          setUsedLetters(new Set(data.guessedLetters));
          
        }
      })
      .catch((error) => console.error("Error fetching status:", error));
  }, []);

  const handleGuess = async (letter) => {
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
      const res = await fetch(buildUrl(`/api/hangman/guess?guess=${letter}`), { method: 'POST' });

      const serverMessage = await res.text();
      if (serverMessage) setMessage(serverMessage);


      fetch(buildUrl('/api/hangman/status'))
        .then(response => response.json())
        .then(data => {
          setProgress(data.progress);
          setAttemptsLeft(data.attemptsLeft);
          setGameOver(data.gameOver);
          setHangmanStage(data.hangmanFigureState);
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

  const nextWord = () => {
    fetch(buildUrl('/api/hangman/next'), { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        setProgress(data.progress);
        setAttemptsLeft(10);
        setGameOver(data.gameOver);
        setHangmanStage(data.hangmanFigureState);
        setMessage("Here's the next word.");
        setUsedLetters(new Set(data.guessedLetters));
        setCorrectWord(data.correctWord);
        setGameWon(data.gameWon);
      })
      .catch((error) => console.error("Error getting next word:", error));
  };

  const startNewGame = () => {
    fetch(buildUrl('/api/hangman/start'), { method: 'POST' })
      .then(() => fetch(buildUrl('/api/hangman/status')))
      .then(response => response.json())
      .then(data => {
        setProgress(data.progress);
        setAttemptsLeft(10);
        setGameOver(false);
        // Ensure gameWon and correctWord are reset when starting a new game
        setGameWon(false);
        setCorrectWord(false);
        setHangmanStage(data.hangmanFigureState);
        setMessage('New game started! Good luck!');
        setUsedLetters(new Set(data.guessedLetters));
        setScore(0);
      })
      .catch((error) => console.error("Error resetting game:", error));
  };

  return (
    <GameContext.Provider value={{
      progress, attemptsLeft, gameOver, hangmanStage, message, 
      usedLetters, score, gameWon, correctWord, 
      handleGuess, nextWord, startNewGame
    }}>
      {children}
    </GameContext.Provider>
  );
};