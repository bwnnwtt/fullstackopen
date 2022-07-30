import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({text, value}) => <td>{text} {value}</td>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  if(good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>No feedback given</div>
    )
  } else {
    return (
        <table>
          <tbody>
            <tr><StatisticLine text="good" value={good} /></tr>
            <tr><StatisticLine text="neutral" value={neutral} /></tr>
            <tr><StatisticLine text="bad" value={bad} /></tr>
            <tr><StatisticLine text="all" value={all} /></tr>
            <tr><StatisticLine text="average" value={average} /></tr>
            <tr><StatisticLine text="positive" value={positive} /></tr>
          </tbody>
        </table>
      )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addToGood = () => {
    setGood(good+1)
  }
  const addToNeutral = () => {
    setNeutral(neutral+1)
  }
  const addToBad = () => {
    setBad(bad+1)
  }

  return (
    <>
      <h1>give feeback</h1>
      <Button text="good" handleClick={()=>addToGood()} />
      <Button text="neutral" handleClick={()=>addToNeutral()} />
      <Button text="bad" handleClick={()=>addToBad()} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App