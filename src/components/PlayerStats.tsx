import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const PlayerStats = () => {
  const health = useSelector((state: RootState) => state.player.health);
  const maxHealth = useSelector((state: RootState) => state.player.maxHealth);
  const points = useSelector((state: RootState) => state.player.points);

  return (
    <div className="player-stats">
      <h2>Player Stats</h2>
      <div>Health: {health}/{maxHealth}</div>
      <div>Points: {points}</div>
      {/* Display other stats as required */}
    </div>
  );
};

export default PlayerStats;