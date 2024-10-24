// ComboItem.js
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/ComboItem.css';
import { Combo } from '../../store/slices/gameSlice';

const ComboItem = (
  {
    combo,
    progress,
    stepStatus
  }:
  {
    combo: Combo,
    progress: number,
    stepStatus: string[]
  }
) => {
  return (
    <div className={`combo-item ${progress === combo.sequence.length ? 'completed' : ''}`}>
      <div className="combo-name">{combo.name}</div>
      <div className="combo-steps">
        {combo.sequence.map((step, index) => (
          <div
            key={index}
            className={`combo-step ${stepStatus[index]}`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

ComboItem.propTypes = {
  combo: PropTypes.object.isRequired,
  progress: PropTypes.number.isRequired,
  stepStatus: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ComboItem;
