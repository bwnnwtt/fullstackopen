import Persons from './components/Persons'
import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook,[])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    
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

  const personsFilter = ({name}) => name.toLowerCase().includes(newFilter.toLowerCase()) ? true : false
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} value={newFilter} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <Persons persons={persons} personsFilter={personsFilter}/>
    </div>
  )
}

export default App