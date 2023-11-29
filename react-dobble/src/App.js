import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import DobbleCard from './components/DobbleCard/DobbleCard';

// connect to socketio server
const socket = io.connect("http://localhost:3003");


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DobbleCard socket={socket} />
      </header>
    </div>
  );
}


export default App;
