'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';


function Play() {
    const router = useRouter();
    const [query, setQuery] = useState({});
    const [player1Score, setPlayer1Score] = useState(0); 
    const [player2Score, setPlayer2Score] = useState(0); 
    const [scoreInput, setScoreInput] = useState(0);
    var [player1Turn, setPlayer1Turn] = useState(true);
    var [scoreHist, setScoreHist] = useState([]);
    var [scoreHist2, setScoreHist2] = useState([]);
    const gameScore = 301;
    const [showModal, setShowModal] = useState(false);
    const [winner, setWinner] = useState('');
    useEffect(() => {
        if (router.query) {
            setQuery(router.query);
        }
    }, [router.query]);

    const searchParams = useSearchParams();
    const player1Name = searchParams.get('player1Name');
    const player2Name = searchParams.get('player2Name');

    function checkWin(score, playerName){
        if(score == gameScore){
            setWinner(playerName);
            setShowModal(true);
            return true; 
        }
        return false; 
    }

    function addScore() {
        const score = Number(scoreInput);
        if (player1Turn) {
            const newScore = player1Score + score;
            if(!checkWin(newScore, player1Name)){
                setPlayer1Score(newScore);
                setScoreHist(prevHistory => [...prevHistory, { score, remaining: gameScore - newScore }]);
            }
            setPlayer1Turn(false);
        } else {
            const newScore = player2Score + score;
            setPlayer2Score(newScore);
            setScoreHist2(prevHistory => [...prevHistory, { score, remaining: gameScore - newScore }]);
            setPlayer1Turn(true);
        }
        setScoreInput(0); 
    }

    return (
        <div class="App">
            <div class="topContainer">
                <h1>Dartz Score</h1>
                <div class="topBtns">
                    <button>Home</button>
                    <button>Restart</button>
                </div>
             
            </div>
            <div class="scoreContainer">
                <div class = "playerContainer">
                    <p>{player1Name || 'Player 1'}</p>
                    <p className="score">{gameScore - player1Score}</p>
                </div>
                <div class="playerContainer">
                    <p>{player2Name || 'Player 2'}</p>
                    <p className="score">{gameScore - player2Score}</p>
                </div>
            </div>
            
            <input class="numInput" type="number" min="0" max="60" value={scoreInput} 
                onChange={(e) => setScoreInput(e.target.value)} />
            <button class="addScoreBtn"onClick={addScore}>Add Score</button>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <h2>{player1Name || 'Player 1'}s History</h2>
                    <ul>
                        {scoreHist.map((entry, index) => (
                            <li key={index}>Score: {entry.score}, Remaining: {entry.remaining}</li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 1, marginLeft: '10px' }}>
                    <h2>{player2Name || 'Player 2'}s History</h2>
                    <ul>
                        {scoreHist2.map((entry, index) => (
                            <li key={index}>Score: {entry.score}, Remaining: {entry.remaining}</li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Modal for game end */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    zIndex: 1000, textAlign: 'center'
                }}>
                    <h2>{winner} Wins!</h2>
                    <button  style={{ marginRight: '10px' }}>Restart</button>
                    <button >Go to Home</button>
                </div>
            )}

            {/* Overlay */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999
                }}></div>
            )}
        </div>
    );
}

const PlayPageWithSuspense = () => (
    <Suspense fallback={<div>Loading...</div>}>
      <Play />
    </Suspense>
  );

export default PlayPageWithSuspense;
