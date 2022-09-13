import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { clearNotification, setNotification } from "../reducers/notificationReducer"

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

  const vote = ({ anecdote }) => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return(
    <>
      {anecdotes
        .slice()
        .sort((a,b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            // handleVote={() => dispatch(addVote(anecdote.id))}
            handleVote={() => vote({anecdote})}
          />
        )
      }
    </>
  )

}

export default AnecdoteList