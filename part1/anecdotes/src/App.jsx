import { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [mostVotesIndex, setMostVotesIndex] = useState(0)

    const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

    const [selected, setSelected] = useState(0)

    const getNextAnecdote = () => {
        const index = Math.floor(Math.random() * anecdotes.length)
        setSelected(index)
    }

    const vote = () => {
        if (points[selected] + 1 > points[mostVotesIndex]) {
            setMostVotesIndex(selected)
        }
        setPoints(prev => {
            return [...prev.slice(0, selected), prev[selected] + 1, ...prev.slice(selected + 1)]
        })
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <br />
            <div>{anecdotes[selected]}</div>
            <div>has {points[selected]} {points[selected] === 1 ? 'vote' : 'votes'}</div>
            <button onClick={vote}>vote</button>
            <button onClick={getNextAnecdote}>next anecdote</button>
            <br />
            <h2>Anecdote with most votes</h2>
            <div>{anecdotes[mostVotesIndex]}</div>
        </div>
    )
}

export default App