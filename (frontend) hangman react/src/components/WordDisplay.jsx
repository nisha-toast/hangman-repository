/* eslint-disable react/prop-types */
export function WordDisplay({ progress, attemptsLeft, score, wordsToGuess, wordsRemaining }) {
    return (
        <div className="word-container">
            <div className="word-left">
                <p>Score: {score}</p>
                <p>Lives Left: {attemptsLeft}</p>
            </div>
            <div className="word-middle">
                <p>Word: {progress}</p>
            </div>
        </div>
    );
}