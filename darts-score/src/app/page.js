'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

function PlayerNames() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    const player1Name = document.getElementById('player1Name').value;
    const player2Name = document.getElementById('player2Name').value;
   //const gameMode = document.querySelector('.gamemodes button.active').textContent;

    // Pass the values to the next page using query parameters
    router.push(`/play?player1Name=${player1Name}&player2Name=${player2Name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="playerNamesContainer">
        <div className="playerName">
          <label>Player 1 Name: </label>
          <input type="text" id="player1Name" />
        </div>
        <div className="playerName">
          <label>Player 2 Name: </label>
          <input type="text" id="player2Name" />
        </div>
      </div>
      <div>
        <div>Game Mode</div>
        <ul className="gamemodes">
          <button>301</button>
          <button>501</button>
          <button>701</button>
        </ul>
      </div>
      <button type="submit">Start Game!</button>
    </form>
  );
}

function App() {
  return (
    <div className="App">
      <PlayerNames />
    </div>
  );
}

export default App;