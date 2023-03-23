import React, { useState, useEffect } from 'react';
import { useSocket } from "../utils/SocketContext";
import GameBoard from './GameBoard';

const PVE = () => {
  const [challengeList, setChallengeList] = useState([]);
  const [showGameBoard, setShowGameBoard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useSocket();
  
  useEffect(() => {
    socket.on('challengeList', (data) => {
      console.log(data)
      setChallengeList(data);
      setIsLoading(false);
    });

    socket.emit('requestChallengeList');

    return () => {
      socket.off('challengeList');
    };
  }, [socket]);

  const handleChallengeClick = () => {
    setShowGameBoard(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {showGameBoard ? (
        <GameBoard />
      ) : (
        <div>
          {challengeList.map((challenge) => (
            <button key={challenge.id} onClick={handleChallengeClick}>
              {challenge.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default PVE;
