export function GameWon({ startNewGame}) {
    return (
        <div className='button-container'>
            <p style={{color:"green"}}>Yay you won the game.</p>
            <button className="start-game-button" onClick={startNewGame}>Start New Game</button>
        </div>
    )
};