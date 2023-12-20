import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [w, setW] = useState(0);
  const [c, setC] = useState(0);
  const [t, setT] = useState(0);
  const [game, setGame] = useState(0);
  const [result, setResult] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);
function computerPlay() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
  // alert(`UserMove: ${playerSelection} and ComputerMove: ${computerSelection}`);
    console.log(`UserMove: ${playerSelection} and ComputerMove: ${computerSelection}`);

  if (playerSelection === computerSelection) {
    recordGame(playerSelection,computerSelection,"Tie");
    return "It's a tie!";
  } else if (
    (playerSelection === 'Rock' && computerSelection === 'Scissors') ||
    (playerSelection === 'Paper' && computerSelection === 'Rock') ||
    (playerSelection === 'Scissors' && computerSelection === 'Paper')
  ) {
    recordGame(playerSelection,computerSelection,"Won");
    return "You win!";
  } else {
    recordGame(playerSelection,computerSelection,"Lose");
    return "You lose!";
  }
}



useEffect(() => {
  const gameData = localStorage.getItem('Game');
  if (gameData) {
    const a = JSON.parse(gameData);
    setW(a["Wins"]);
    setC(a["Loss"]);
    setT(a["Tie"]);
    setGame(a["Wins"] + a["Loss"] + a["Tie"]);
  }
}, []);


const play = (playerSelection) => {
    const computerSelection = computerPlay();
    const Result = playRound(playerSelection, computerSelection);
    if(Result==="It's a tie!"){
      setT(t+1);
    }
    else if(Result==="You win!"){
      setW(w+1);
    }
    else{
      setC(c+1);
    }
    setGame(game+1);
    localStorage.setItem('Game',JSON.stringify({'Wins':w,'Loss':c,'Tie':t}));

      const showResult = (newResult) => {
        setResult(newResult);
        setShowSnackbar(true);
      };
        console.log(Result);
      showResult(Result);

     
}

const [rpsHistory, setRpsHistory] = useState([]);

useEffect(() => {
  const record = localStorage.getItem('record');
  if (record) {
    setRpsHistory(JSON.parse(record));
  }
}, []);

const recordGame = (player, computer, result) => {
  const newHistory = [...rpsHistory, [player, computer, result]];
  setRpsHistory(newHistory);
  localStorage.setItem('record', JSON.stringify(newHistory));
};
// add a section that record the history of Rock Paper sissor i.e. serial number and who won


const reset=()=>{
  /* The code `let w=0; let c=0; let t=0; let Game=0;` is initializing four variables (`w`, `c`, `t`, and
  `Game`) with initial values of 0. These variables are used to keep track of the number of Wins,
  Losses, ties, and total Games played in the Game. */
    
    setW(0);
    setC(0);
    setT(0);
    setGame(0);
    console.clear();
    setRpsHistory([]);
    
  }
  return (
    <div>
    <div className="body">
        <h1>ROCK PAPER SCISSORS</h1>
        <div id="button">
        <button><img src={process.env.PUBLIC_URL+ "/images/rock.png"}  alt="rock" onClick={() => play('Rock')}/></button>
        <button><img src={process.env.PUBLIC_URL+ "/images/paper.png"} alt="paper" onClick={() => play('Paper')}/></button>
        <button><img src={process.env.PUBLIC_URL+ "/images/scissors.png"} alt="sissor" onClick={() => play('Scissors')}/></button>
        <button><img className="reset" src={process.env.PUBLIC_URL+ "/images/reset.jpg"}  onClick={() => reset()} alt="reset"/></button>
        </div>
        <div id="score">
            <h2>Game Summary: </h2>
            <table>
                <tr>
                    <th>Wins</th>
                    <th>Loses</th>
                    <th>Ties</th>
                    <th>Game Played</th>
                </tr>
                <tr>
                    <td id="Wins">{w}</td>
                    <td id="Loss">{c}</td> 
                    <td id="Tie">{t}</td>
                    <td id="total">{game}</td>
                </tr>
            </table>
        </div>
        <div id="history">
            <h2>Game History: </h2>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player</th>
                  <th>Computer</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {rpsHistory.map((game, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{game[0]}</td>
                    <td>{game[1]}</td>
                    <td>{game[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
        </div>
    </div>
    <div>
      {showSnackbar && <div id="snackbar" className="show">{result}</div>}
      
    </div>
  </div>
  );
}

export default App;
