import React, { useState, useEffect } from 'react';
import { useSocket } from '../../utils/SocketContext';
import '../../styles/GameSidebar.css';
import { GameState } from '../../store/slices/gameSlice';

const GameSidebar = () => {
    const socket = useSocket();
    const [gameState, setGameState] = useState<GameState>();
    useEffect(() => {
        if (socket) {
            socket.on('gameStateUpdate', (gameState: GameState) => {
                setGameState(gameState)
            });

            return () => {
                socket.off('wordAccepted');
            };
        }
    }, [socket]);

    if (!gameState) {
        return <div className="game-sidebar">Waiting for game state...</div>;
    }

    return (
        <div className="game-sidebar">
            <h3>Game State</h3>
            <p>
                <strong>Player HP:</strong> {gameState.playerHp}
            </p>
            <p>
                <strong>Monster HP:</strong> {gameState.monsterHp}
            </p>
            <p>
                <strong>Score:</strong> {gameState.score}
            </p>
            <h4>Game Log</h4>
            <ul>
                {gameState.gameLog && gameState.gameLog.map((entry, index) => (
                    <li key={index} className={entry.color}>
                        {entry.type === 'monsterAttack' ? (
                            `${entry.abilityName} dealt ${entry.damage} damage` 
                        ) : (
                            `${entry.word} (${entry.value})`
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameSidebar;
