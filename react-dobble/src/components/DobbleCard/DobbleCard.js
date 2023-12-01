import React, { useState } from 'react';
import './DobbleCard.css';
import { socket } from '../../socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faLightbulb,
  faQuestionCircle,
  faFaceKiss,
  faUser,
  faVenusDouble,
  // ...import other icons you need
} from '@fortawesome/free-solid-svg-icons';

export function DobbleCard() {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  // Array of FontAwesome icons
  const symbols = [
    faClock,
    faLightbulb,
    faQuestionCircle,
    faFaceKiss,
    faUser,
    faVenusDouble,
    // ...other icons
  ];

  const handleIconClick = (iconName) => {
    // Send message to Socket.IO server
    socket.emit('symbol-click', iconName);
  };

  return (
    <div className="dobble-card">
      {symbols.map((icon, index) => (
        <FontAwesomeIcon
          key={index}
          icon={icon}
          className={`symbol ${hoveredIcon === icon.iconName ? 'hovered' : ''}`}
          // onMouseEnter={() => setHoveredIcon(icon.iconName)}
          // onMouseLeave={() => setHoveredIcon(null)}
          onClick={() => handleIconClick(icon.iconName)}
          style={{ transform: `rotate(${index * (360 / symbols.length)}deg) translate(100px) rotate(${-index * (360 / symbols.length)}deg)` }}
        />
      ))}
    </div>
  );
};
