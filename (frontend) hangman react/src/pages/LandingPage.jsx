import { useGame } from '../context/GameContext';
import classes from "./LandingPage.module.css";
import { useNavigate } from "react-router";

export function LandingPage() {
    const navigate = useNavigate();
    const { startNewGame } = useGame();

    const startGame = () => {
        startNewGame();
        navigate("/game"); // Navigate to the game page
    };

    return (
        <div className={classes.landingDescription}>
            <div className={`${classes.hangmanGame} ${classes.landingTitle}`}>
                <header>
                    <h1 className="fancy-word">
                        <span> Hangman Game </span>
                    </h1>
                </header>
            </div>
            <div className={classes.landingDescription}>
                <p> Instructions: </p>
                <p>Guess the word before the hangman is fully drawn</p>
            </div>
            <div className="start-game-container">
                <button className="start-game-button" onClick={startGame}>Start Game</button>
            </div>
        </div>
    );
}