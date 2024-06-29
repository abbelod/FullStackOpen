import { useState } from 'react'

const Button = (props) => {
  const goodClick = props.goodClick
  const neutralClick = props.neutralClick
  const badClick = props.badClick

  return (
    <div>

      <button onClick={goodClick}>good </button>
      <button onClick={neutralClick}>neutral </button>
      <button onClick={badClick}>bad </button>

    </div>


  )

}


const Statisticline = (props) => {

  let text = props.text
  let val = props.val


  return (
    <tr>
      <td>
        <h3>{text} </h3>
      </td>
      <td>
        <h3> {val}</h3>
      </td>
    </tr>
  )

}

const Statistics = (props) => {

  let good = props.good
  let total = props.total
  let neutral = props.neutral
  let bad = props.bad
  let fbgiven = props.fbgiven

  if (!fbgiven) {
    return (
      <div>
        <br />
        <h3>No feedback given</h3>
      </div>
    )
  }

  return (

    <div>
      <table>
        <tbody>
          <Statisticline text="good" val={good}></Statisticline>
          <Statisticline text="neutral" val={neutral}></Statisticline>
          <Statisticline text="bad" val={bad}></Statisticline>
          <Statisticline text="all" val={total}></Statisticline>
          <Statisticline text="average" val={(good - bad) / total}></Statisticline>
          <Statisticline text="positive" val={good / total * 100 + '%'} ></Statisticline>

        </tbody>
      </table>

    </div>
  )



}

function App() {

  const [total, setTotal] = useState(0)
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [fbgiven, setFbgiven] = useState(false)

  const goodClick = () => {
    let newGood = good + 1
    setGood(newGood)
    setTotal(newGood + bad + neutral)
    if (!fbgiven) {
      setFbgiven(true)
    }
  }

  const badClick = () => {
    let newBad = bad + 1
    setBad(newBad)
    setTotal(good + newBad + neutral)
    if (!fbgiven) {
      setFbgiven(true)
    }

  }

  const neutralClick = () => {
    let newNeutral = neutral + 1
    setNeutral(newNeutral)
    setTotal(good + bad + newNeutral)
    if (!fbgiven) {
      setFbgiven(true)
    }

  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button goodClick={goodClick}
        badClick={badClick}
        neutralClick={neutralClick}>

      </Button>
      <Statistics good={good} bad=
        {bad} neutral={neutral} total={total} fbgiven={fbgiven}></Statistics>
    </div>
  )
}

export default App
