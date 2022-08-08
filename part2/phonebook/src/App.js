import { useState } from 'react'

const Person = ({person}) => <div>{person.name} {person.number}</div>
const Phonebook = ({persons}) => <>{persons.map((person) => <Person key={person.id}person={person}/>)}</>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    // const names = persons.map(person => person.name)
    
    if(persons.map(person => person.name).indexOf(newName) === -1) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // console.log("Persons: ", persons.map(person => person.name))

  return (
    <div>
      <div>newName: {newName}</div>
      <div>newNumber: {newNumber}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Phonebook persons={persons} />
    </div>
  )
}

export default App