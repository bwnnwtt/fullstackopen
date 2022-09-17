import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { clearNotification, doNotification, setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const vote = ({ anecdote }) => {
    dispatch(addVote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }

  if (filter === '') {
    return (
      <>
        {anecdotes
          .slice()
          .sort((a,b) => b.votes - a.votes)
          .map(anecdote =>
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleVote={() => vote({anecdote})}
            />
          )
      }
      </>
    )
  } else {
    return (
      <>
        {anecdotes
          .filter(anecdote => 
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
          )
          .sort((a,b) => b.votes - a.votes)
          .map(anecdote =>
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleVote={() => vote({anecdote})}
            />
          )
        }
      </>
    )
  }

}

export default AnecdoteList