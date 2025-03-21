import { useGame } from '../context/GameContext';
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
    usedLetters, gameWon, correctWord, handleGuess, nextWord, startNewGame 
  } = useGame();

  return (
    <div className={classes.hangmanInstructions}>
      <div className="content">
        <WordDisplay progress={progress} attemptsLeft={attemptsLeft} score={score} />
        <div className="drawing-box">
          <HangmanDrawing stage={hangmanStage} />
        </div>
        {gameOver && <p style={{ color: "red" }} className='final-message'>{message}</p>}
        {gameWon && <p style={{ color: "green" }} className='final-message'>{message}</p>}
        {(!gameOver && !gameWon) && <p style={{ color: "darkslateblue" }} className='final-message'>{message}</p>}

        <div className="keyboard">
          {(!gameOver && !gameWon) ? (
            <div >
              <Keyboard handleGuess={handleGuess} usedLetters={usedLetters} correctWord={correctWord} />
              {correctWord && !gameWon && <NextWord nextWord={nextWord} />}
            </div>
          ) : (
            <>
              {!gameWon && <GameOver startNewGame={startNewGame} />}
            </>
          )}
          {gameWon && <GameWon />}
        </div>
      </div>
    </div>
  );
}