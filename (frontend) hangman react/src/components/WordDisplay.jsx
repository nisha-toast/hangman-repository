/* eslint-disable react/prop-types */
export function WordDisplay({ progress, attemptsLeft, score }) {
    return (
        <div className="word-container">
            <div className="word-stats">
                <p>Score: {score}</p>
                <p>Lives Left: {attemptsLeft}</p>
            </div>
            <div className="word-target">
                <p>WORD: <span class="fancy-word">{progress}</span></p>
            </div>
        </div>
    );
}
