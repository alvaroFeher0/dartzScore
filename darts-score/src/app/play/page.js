'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'



function Play() {
    const router = useRouter();
    const [query, setQuery] = useState({});
    const [player1Score, setPlayer1Score] = useState(30); // Initial score for player 1
    const [player2Score, setPlayer2Score] = useState(20); // Initial score for player 2
    const [scoreInput, setScoreInput] = useState(0);
    var [player1Turn, setPlayer1Turn] = useState(true);

    useEffect(() => {
        if (router.query) {
            setQuery(router.query);
        }
    }, [router.query]);

    const searchParams = useSearchParams()
    const player1Name = searchParams.get('player1Name')
    const player2Name = searchParams.get('player2Name');
    
    function addScore(){
        console.log("adding a score of "+ scoreInput);
        if(player1Turn){
            setPlayer1Score(prevScore => prevScore + Number(scoreInput));
            setPlayer1Turn(false);
        }else{
            setPlayer2Score(prevScore => prevScore + Number(scoreInput));
            setPlayer1Turn(true);
        }
    }

    return (
        <div>
            <h1>Play Page</h1>
            <p>Player 1: {player1Name || 'Loading...'}</p>
            <p>Player 2: {player2Name || 'Loading...'}</p>
            <p class="score">Player1 score: {player1Score}</p>
            <p class="score">Player2 score: {player2Score}</p>
            <input type="number" min="0" max="60"  value={scoreInput} 
                onChange={(e) => setScoreInput(e.target.value)}></input>
            <button onClick={addScore}>Add Score</button>
        </div>
    );
}

export default Play;
