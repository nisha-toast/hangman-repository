import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the GameContext
const GameContext = createContext();

// Custom hook to access the context
export const useGame = () => {
  return useContext(GameContext);
};

// Provider component that holds the game state
export const GameProvider = ({ children }) => {
  const [progress, setProgress] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [hangmanStage, setHangmanStage] = useState('');
  const [message, setMessage] = useState('');
  const [usedLetters, setUsedLetters] = useState(new Set());
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [correctWord, setCorrectWord] = useState(false);

  // Fetch initial game state on mount
  useEffect(() => {
    fetch(`/api/hangman/status`)
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

  // Functions to interact with the game (e.g., guess a letter, start a new game, go to next word)
  const handleGuess = (letter) => {
    if (usedLetters.has(letter)) return;
    fetch(`/api/hangman/guess?guess=${letter}`, { method: 'POST' })
      .then(response => response.text())
      .then(message => {
        setMessage(message);
        fetch(`/api/hangman/status`)
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
          });
      });
  };

  const nextWord = () => {
    fetch(`/api/hangman/next`, { method: 'POST' })
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
    fetch(`/api/hangman/start`, { method: 'POST' })
      .then(() => fetch(`/api/hangman/status`))
      .then(response => response.json())
      .then(data => {
        setProgress(data.progress);
        setAttemptsLeft(10);
        setGameOver(false);
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