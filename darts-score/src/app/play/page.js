'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function Play() {
    const router = useRouter();
    const [query, setQuery] = useState({});
    const [player1Score, setPlayer1Score] = useState(0); // Initial score for player 1
    const [player2Score, setPlayer2Score] = useState(0); // Initial score for player 2
    const [scoreInput, setScoreInput] = useState(0);
    var [player1Turn, setPlayer1Turn] = useState(true);
    var [scoreHist, setScoreHist] = useState([]);
    var [scoreHist2, setScoreHist2] = useState([]);
    const gameScore = 301;

    useEffect(() => {
        if (router.query) {
            setQuery(router.query);
        }
    }, [router.query]);

    const searchParams = useSearchParams();
    const player1Name = searchParams.get('player1Name');
    const player2Name = searchParams.get('player2Name');

    function addScore() {
        const score = Number(scoreInput);
        if (player1Turn) {
            const newScore = player1Score + score;
            setPlayer1Score(newScore);
            setScoreHist(prevHistory => [...prevHistory, { score, remaining: gameScore - newScore }]);
            setPlayer1Turn(false);
        } else {
            const newScore = player2Score + score;
            setPlayer2Score(newScore);
            setScoreHist2(prevHistory => [...prevHistory, { score, remaining: gameScore - newScore }]);
            setPlayer1Turn(true);
        }
        setScoreInput(0); // Clear the input after adding the score
    }

    return (
        <div>
            <h1>Play Page</h1>
            <p>Player 1: {player1Name || 'Loading...'}</p>
            <p>Player 2: {player2Name || 'Loading...'}</p>
            <p className="score">Player1 score: {gameScore - player1Score}</p>
            <p className="score">Player2 score: {gameScore - player2Score}</p>
            <input type="number" min="0" max="60" value={scoreInput} 
                onChange={(e) => setScoreInput(e.target.value)} />
            <button onClick={addScore}>Add Score</button>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <h2>{player1Name || 'Player 1'}'s History</h2>
                    <ul>
                        {scoreHist.map((entry, index) => (
                            <li key={index}>Score: {entry.score}, Remaining: {entry.remaining}</li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 1, marginLeft: '10px' }}>
                    <h2>{player2Name || 'Player 2'}'s History</h2>
                    <ul>
                        {scoreHist2.map((entry, index) => (
                            <li key={index}>Score: {entry.score}, Remaining: {entry.remaining}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Play;
