import { useGame } from '../context/GameContext';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { HangmanDrawing } from "../components/HangmanDrawing";
import { NextWord } from "../components/NextWord";
import { WordDisplay } from "../components/WordDisplay";
import { GameOver } from "../components/GameOver";
import { Keyboard } from "../components/Keyboard";
import { GameWon } from "../components/GameWon";
import classes from "./HangmanGame.module.css";

export function HangmanGame() {
  const { 
    progress, attemptsLeft, score, gameOver, hangmanStage, message, 
    usedLetters, gameWon, correctWord, handleGuess, nextWord, startNewGame, loadGame
  } = useGame();

  const { gameId } = useParams();

  useEffect(() => {
    if (gameId) loadGame(gameId);
  }, [gameId, loadGame]);

  return (
    <div className={classes.hangmanPage}>
      <div className={classes.hangmanGame}>
        <WordDisplay progress={progress} attemptsLeft={attemptsLeft} score={score} />

        <div className="drawing-box">
          <HangmanDrawing stage={hangmanStage} />
        </div>

        {gameOver && <p style={{ color: "red" }} className='final-message'>{message}</p>}
        {gameWon && <p style={{ color: "green" }} className='final-message'>{message}</p>}
        {(!gameOver && !gameWon) && <p style={{ color: "darkslateblue" }} className='final-message'>{message}</p>}

        <div className="keyboard-container">
          {(!gameOver && !gameWon) ? (
            <div>
              <Keyboard handleGuess={(letter) => handleGuess(gameId, letter)} usedLetters={usedLetters} correctWord={correctWord} />
              {correctWord && !gameWon && <NextWord nextWord={() => nextWord(gameId)} />}
            </div>
          ) : (
            <>
              {!gameWon && <GameOver startNewGame={() => startNewGame(gameId)} />}
            </>
          )}
          {gameWon && <GameWon startNewGame={() => startNewGame(gameId)} />}
        </div>
      </div>
    </div>
  );
}