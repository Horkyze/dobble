import React, { useState } from 'react';

const RoomPanel = (socket) => {
  const [playerName, setPlayerName] = useState('');
  const [roomName, setRoomName] = useState('');

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleJoinRoom = () => {
    console.log(`Joining room: ${roomName} as player: ${playerName}`);
    // Add logic to join the room
  };

  const handleCreateRoom = () => {
    console.log(`Creating room: ${roomName} with player: ${playerName}`);
    // Add logic to create a new room
  };

  return (
    <div style={{ width: '100%' }}>
      <input
        type="text"
        placeholder="Player Name"
        value={playerName}
        onChange={handlePlayerNameChange}
      />
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={handleRoomNameChange}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  );
};

export default RoomPanel;
