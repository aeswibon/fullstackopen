import React from "react";

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Row = (props) => {
  return (
    <tr><td>{props.text} {props.value}</td></tr>
  )
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;
  const average = (props.good - props.bad) / total;
  const positive = props.good * (100 / total);

  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Row text="good" value={props.good} />
          <Row text="neutral" value={props.neutral} />
          <Row text="bad" value={props.bad} />
          <Row text="all" value={total} />
          <Row text="average" value={average} />
          <Row text="positive" value={positive + " %"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = React.useState(0)
  const [bad, setBad] = React.useState(0)
  const [neutral, setNeutral] = React.useState(0)

  const goodClick = () => {
    setGood(good + 1)
  }

  const neutralClick = () => {
    setNeutral(neutral + 1)
  }

  const badClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodClick} text="good" />
      <Button handleClick={neutralClick} text="neutral" />
      <Button handleClick={badClick} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;
