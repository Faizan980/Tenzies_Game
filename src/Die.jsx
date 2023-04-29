import React from "react"
import dice1 from "./assets/dice1.svg"
import dice2 from "./assets/dice2.svg"
import dice3 from "./assets/dice3.svg"
import dice4 from "./assets/dice4.svg"
import dice5 from "./assets/dice5.svg"
import dice6 from "./assets/dice6.svg"



export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : ""
    }

    const dices = [dice1, dice2, dice3, dice4, dice5, dice6]
    const diceIndex = props.value - 1
    return (
        // <div 
        //     className="die-face" 
        //     style={styles}
        //     onClick={props.holdDice}
        // >
        //     <h2 className="die-num">{props.value}</h2>
        // </div>
        <div 
            className={props.isHeld ? 'die--box rotate-180 transition duration-1000' : 'die--box'}
            style={styles}
            onClick={() => props.holdDice(props.id, props.value)}
            >
            <img src={dices[diceIndex]} 
            alt="die-face" 
            className="dice--image"
        />
        </div>
    )
}