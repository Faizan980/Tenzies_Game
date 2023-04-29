import React, {useState} from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, SetTenzies] = useState(false)
  const [rollNum, setRollNum] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [gameDuration, setGameDuration] = useState(null)
  const [bestTime, setBestTime] = useState(null)
  const [count, setCount] = useState(0)
  const [number, setNumber] = useState(0)

  // console.log(bestTime)

  React.useEffect(() => {
    if (startTime && tenzies) {
      // console.log('startTime: ', startTime)
      const duration = Math.round(new Date() - startTime) / 1000

      // console.log('duration', duration)

      setGameDuration(duration)

    if (!bestTime || duration < bestTime) {
        localStorage.setItem('bestTime', duration)
        setBestTime(duration)
      }
    }
  }, [startTime, tenzies]);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if (allHeld && allSameValue) {
      SetTenzies(true)
      setStartTime(+new Date())
    }

}, [dice])

  function generateNewNumber() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(generateNewNumber())
    }
    return newDice
}

    function rollDice() {
      if (!tenzies) {
        setDice(oldDice => oldDice.map(die => {
          return die.isHeld ?
                 die:
                 generateNewNumber()
        }))
        setRollNum(prevRollNum => prevRollNum + 1)
      } else {
          SetTenzies(false)
          setDice(allNewDice())
          setRollNum(0)
          setStartTime(null);
          setGameDuration(null);
      }
        
    }

    function holdDice(diceId, diceNumber) {
      setCount(prevCount => prevCount + 1)

      if (number === 0) {
        firstDiceValue(diceId, diceNumber)
      }
      
      if (number === diceNumber || number === 0) {
        setDice(oldDice => oldDice.map(die => {
          return die.id === diceId ?
          {...die, isHeld: !die.isHeld} :
          die
        }))
      }

    }

    React.useEffect(() => {
      if(dice.every((die) => die.isHeld === false)) {
        setNumber(0)
      }
    }, [count])
    

    function firstDiceValue(diceID, diceNumber) {
      setNumber(diceNumber)
    }

    const diceElement = dice.map((die) => (
      <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld} 
        holdDice={() => holdDice(die.id)} 
      />
    ));

    const gameDurationDisplay = 
                startTime && tenzies ? 
                <p className="game-paragraph">Game Duration: {gameDuration} seconds</p> : 
                null

    const bestTimeDisplay = 
                bestTime ? 
                <p className="bestTime-paragraph">Best Time: {bestTime} seconds</p> : 
                null 
    
  return (
        <main>
            {bestTimeDisplay}
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
              Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElement}
            </div>
            <div className="btn">
              <button className={tenzies ? 'roll--btn animate-bounce' : 'roll--btn'} onClick={rollDice}>
                  {tenzies ? 'New Game' : 'Roll'}
              </button>
                <p className="roll-count">Number of Rolls: {rollNum}</p>
                {gameDurationDisplay}
            </div>
        </main>
      )
}