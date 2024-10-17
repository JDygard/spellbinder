// ComboSidebar.js
import React, { useContext, useState, useEffect } from 'react';
import { useSocket } from '../../utils/SocketContext';
import ComboItem from './ComboItem';

const ComboSidebar = () => {
  const socket = useSocket();
  const [combos, setCombos] = useState([]);
  const [comboProgress, setComboProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket.on('gameStateUpdate', (gameState) => {
      // Extract combos and gamelog from gameState
      console.log(gameState)
      const { combos, gameLog } = gameState;

      // Set combos state
      setCombos(combos);

      // Process gamelog to determine combo progress
      const progress = processGamelogForComboProgress(gameLog, combos);
      setComboProgress(progress);

      // Set loading state to false
      setIsLoading(false);
    });

    return () => {
      socket.off('gameStateUpdate');
    };
  }, [socket]);

  const processGamelogForComboProgress = (gamelog, combos) => {
    const validWordEntries = gamelog.filter((entry) => entry.color === 'success');

    // Initialize an array to store the progress of each combo
    const comboProgress = combos.map((combo) => ({
      progress: 0,
      stepStatus: combo.sequence.map(() => ''),
    }));

    // Iterate through the combos
    for (let comboIndex = 0; comboIndex < combos.length; comboIndex++) {
      const combo = combos[comboIndex];
      let sequenceIndex = 0;
      let comboStartTime = null;

      // Iterate through the valid word entries in reverse order
      for (let i = validWordEntries.length - 1; i >= 0; i--) {
        const entry = validWordEntries[i];

        // If the word length matches the current combo step
        if (entry.length === combo.sequence[sequenceIndex]) {
          // Update stepStatus
          comboProgress[comboIndex].stepStatus[sequenceIndex] = 'active';

          // If this is the first step in the combo, set the combo start time
          if (sequenceIndex === 0) {
            comboStartTime = entry.submittedAt;
          }

          // If the time difference is within the combo time limit, increment the sequence index
          if (comboStartTime - entry.submittedAt <= combo.timeLimit * 1000) {
            sequenceIndex++;
          } else {
            // If the time limit is exceeded, reset the combo progress
            break;
          }

          // If the entire combo sequence has been matched, set the combo progress and exit the loop
          if (sequenceIndex === combo.sequence.length) {
            comboProgress[comboIndex].progress = sequenceIndex;
            // Update stepStatus
            comboProgress[comboIndex].stepStatus = comboProgress[comboIndex].stepStatus.map(() => 'completed');
            break;
          }
        } else {
          // If the word length doesn't match, reset the combo progress
          break;
        }
      }
    }

    return comboProgress;
  };

  return (
    <div className="combo-sidebar">
      {isLoading ? (
        <div className="loading-screen">Loading...</div>
      ) : (
        combos.map((combo, index) => (
          <ComboItem
            key={combo.id}
            combo={combo}
            progress={comboProgress[index].progress}
            stepStatus={comboProgress[index].stepStatus}
          />
        ))
      )}
    </div>
  );
};

export default ComboSidebar;
