import React, { useEffect } from 'react';
import { getSocket, useSocket } from '../hooks/useSocketActions';
import GameBoard from './GameBoard';

const PVE = () => {
  const handlePVEData = (data) => {
    console.log("PVE data:", data);
  };

  return (
    <GameBoard />
  );
};

export default PVE;
