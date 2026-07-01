import classes from "./LandingPage.module.css";
import { useNavigate } from "react-router";

export function LandingPage() {
    const navigate = useNavigate();
    const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

    const startGame = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/hangman/games`, { method: 'POST' });
            const id = await res.text();
            navigate(`/game/${id}`);
        } catch (err) {
            console.error('Failed to start game', err);
        }
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