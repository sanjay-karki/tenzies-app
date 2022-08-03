import React from "react"
import {nanoid} from "nanoid"
import Die from "./Components/Die"
import Confetti from 'react-confetti'


export default function App() {
  const [dieNum, setDieNum] = React.useState(randomNumber())
  const [tenzies, setTenzies] = React.useState(false)

  function holdDice(id) {
    // console.log(id)
    setDieNum( prevState => prevState.map(x => {
         return x.id===id ? {...x, isHeld: !x.isHeld} :  x
      }) 
    )
  }

  function randomNumber() {
    const dieArray = []
    for (let i=0; i<10; i++) {
      dieArray[i]={
        value: Math.floor((Math.random() * 6) + 1), 
        isHeld: false, 
        id:nanoid()}
    }

    return dieArray
  }

  function handleRollClick() {
    if (tenzies===true) {
      setDieNum(randomNumber()) 
      setTenzies(false)
    } else setDieNum(prevDice => prevDice.map(x => {
      return x.isHeld ? x : {...x, value: Math.floor((Math.random() * 6) + 1), id:nanoid()}
    }))
    
    //This doesn't work because ?: conditional rendering cannot take 2 or more condition results iykwim 
    // tenzies ? (setDieNum(randomNumber()) && setTenzies(false)) : setDieNum(prevDice => prevDice.map(x => {
    //   return x.isHeld ? x : {...x, value: Math.floor((Math.random() * 6) + 1), id:nanoid()}
    // }))

  }

  React.useEffect(() => {
    const allTrue = dieNum.every(x => x.isHeld)
    const firstDie = dieNum[0].value
    const allSameDie = dieNum.every(x=> x.value === firstDie)
    if (allTrue && allSameDie) {
      setTenzies(true)
      console.log("Nice!")
    }
  }, [dieNum])

  const dieValue = dieNum.map(x => (
    <Die 
      key={x.id} 
      value={x.value} 
      isHeld={x.isHeld} 
      holdDice={() => holdDice(x.id) }
    />)
    )
    

  return (
    <>
    <main className="main--container">
    {tenzies && <Confetti />}
    <div className="intro--container">
      <h1>TENZIES</h1>
      <p><h3>Try to get all ten of your dice to the same number. Click to freeze a die.</h3></p>
    </div>
    <div className="numbers--container">
      {dieValue}
    </div> 
    <button className="roll--btn" onClick={handleRollClick}>{tenzies? "New Game" : "Roll"}</button>  
    </main>
    <footer>
      By <a href="https://www.linkedin.com/in/sanjay-karki9/" target="_blank" rel="noreferrer">Sanjay Karki</a>
    </footer>
    </>
   
  )
}


