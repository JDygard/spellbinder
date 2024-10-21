import React, { useState, useEffect } from 'react';
import { useSocket } from "../../utils/SocketContext";
import GameBoard from './GameBoard';
import GameSidebar from './GameSidebar';
import ComboSidebar from './ComboSidebar';

interface Challenge {
  id: string;
  name: string;
  reward: string;
}

interface Monster {
  id: number;
  type: string;
  name: string;
  hp: number;
  abilities: {
    name: string;
    damage: number;
    effects: Record<string, number>;
  }[];
}

const initialMonster: Monster = {
  id: 0,
  type: "",
  name: "",
  hp: 0,
  abilities: [],
};

const PVE = () => {
  const [challengeList, setChallengeList] = useState<Challenge[]>([]);
  const [showGameBoard, setShowGameBoard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonster, setCurrentMonster] = useState<Monster>(initialMonster);
  const socket = useSocket();

  useEffect(() => {
    socket.on('challengeList', (data: Challenge[]) => {
      setChallengeList(data);
      setIsLoading(false);
    });

    socket.on('startChallenge', (monster: Monster) => {
      console.log(monster);
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

  const handleChallengeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    const target = event.target as HTMLButtonElement;
    socket.emit("challengeSelected", target.id);
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
