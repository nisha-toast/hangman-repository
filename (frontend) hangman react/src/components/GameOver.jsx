export function GameOver({ startNewGame}) {

    return (
        <div className='button-container'>
            <button className="start-game-button" onClick={startNewGame}>Start New Game</button>
        </div>
    )
};