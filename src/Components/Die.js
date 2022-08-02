import React from "react"

export default function Die(props) {
    
    return (
        <div className="all--numbers" onClick={props.holdDice} style={{background: props.isHeld ? '#FFD3B6' : '#ffffff' }}>
            <h2>{props.value}</h2>
        </div>
    )
}