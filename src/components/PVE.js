import React, { useState, useEffect } from 'react';
import { useSocket } from "../utils/SocketContext";
import GameBoard from './GameBoard';
import GameSidebar from './GameSidebar';
import ComboSidebar from './ComboSidebar';

const PVE = () => {
  const [challengeList, setChallengeList] = useState([]);
  const [showGameBoard, setShowGameBoard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonster, setCurrentMonster] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    socket.on('challengeList', (data) => {
      setChallengeList(data);
      setIsLoading(false);
    });

    socket.on('startChallenge', (monster) => {
      setCurrentMonster(monster);
      setIsLoading(false)
      setShowGameBoard(true);
    });

    socket.emit('requestChallengeList');

    return () => {
      socket.off('challengeList');
      socket.off('startChallenge');
    };
  }, [socket]);

  const handleChallengeClick = (event) => {
    setIsLoading(true);
    socket.emit("challengeSelected", event.target.id);
  };

  if (isLoading) {
    return <div>Loading in PVE</div>;
  }

  return (
    <>
      {showGameBoard ? (
        <div className="game-container">
          <GameSidebar />
          <GameBoard />
          <ComboSidebar />
        </div>
      ) : (
        <div>
          {challengeList.map((challenge) => (
            <button key={challenge.id} id={challenge.id} onClick={handleChallengeClick}>
              {challenge.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default PVE;
