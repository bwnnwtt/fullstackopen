import Persons from './components/Persons'
import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/personService'

const App = () => {

  const hook = () => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
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
      }

      personService
        .create(personObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
        })
      
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

  const handleDeleteClick = person => {
    if(window.confirm(`Delete ${person.name} ?`))
      personService.deletePerson(person.id).then(setPersons(persons.filter(n => n.id !== person.id)))
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
      <Persons 
        persons={persons} 
        personsFilter={personsFilter}
        handleDeleteClick={handleDeleteClick}
        />
    </div>
  )
}

export default App