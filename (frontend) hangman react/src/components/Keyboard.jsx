/* eslint-disable react/prop-types */
import React from 'react';

function KeyboardComponent({ handleGuess, usedLetters, gameOver, correctWord }) {
    // const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const rows = [
        'ABCDEFG'.split(''),
        'HIJKLMN'.split(''),
        'OPQRST'.split(''),
        'UVWXYZ'.split(''),
    ];
    
    return (
        <div className="keyboard">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((letter) => {
                        const isUsed = usedLetters && typeof usedLetters.has === 'function' && usedLetters.has(letter);
                        return (
                        <button 
                            color="seagreen"
                            key={letter}
                            onClick={() => handleGuess(letter)}
                            disabled={isUsed || gameOver || correctWord}
                            className="keyboard-button">
                            {letter}
                        </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

// Memoize to avoid unnecessary re-renders when unrelated context changes
export const Keyboard = React.memo(KeyboardComponent);
