import React from 'react';
import { getSocket, useSocket } from '../utils/socket';
import GameBoard from './GameBoard';

const PVE = () => {
  const handlePVEData = (data) => {
    console.log("PVE data:", data);
  };

  useSocket(handlePVEData)

  return (
    <GameBoard />
  );
};

export default PVE;
