import React from 'react';

const Header = ({ name }) => <h2>{name}</h2>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = React.useState(0)
  const [allVotes, setAllVotes] = React.useState(Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = React.useState(0)

  const handleVoteClick = () => {
    const newAllVotes = [...allVotes]
    newAllVotes[selected] += 1
    setAllVotes(newAllVotes)
    console.log(newAllVotes)

    // change the most voted anecdote
    if (newAllVotes[selected] > newAllVotes[mostVotes]) {
      setMostVotes(selected)
    }
  }

  const handleAnecdoteClick = () => {
    const arrayIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(arrayIndex)
  }

  return (
    <div>
      <Header name="Anecdote of the day" />
      {anecdotes[selected]}<br />
      has {allVotes[selected]} votes<br />
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleAnecdoteClick} text="Next anecdote" />

      <Header name="Anecdote with most votes" />
      {anecdotes[mostVotes]}<br />
      has {allVotes[mostVotes]} votes<br />
    </div>
  );
}

export default App;
