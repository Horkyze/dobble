import logo from './logo.svg';
import './App.css';
import { socket } from './socket';
import { useEffect, useState } from 'react';
import { RoomPanel } from './components/RoomPanel/RoomPanel';
import { DobbleCard } from './components/DobbleCard/DobbleCard';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log('Connected');
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log('Disconnected');
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <RoomPanel />
        <DobbleCard />
      </header>
    </div>
  );
}
