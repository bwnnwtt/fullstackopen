import Persons from './components/Persons'
import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/personService'
import Notification from './components/Notification'

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
  const [notification, setNotification] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()
    
    const idx = persons.map(person => person.name).indexOf(newName)
    if(idx === -1) {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
          const message = `Added ${addedPerson.name}`
          const type = 'success'
          setNotification({ message: message, type: type})
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(error => {
          const message = error.response.data.error
          const type = 'error'
          setNotification({ message: message, type: type})
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
      
    } else {
      if(persons[idx].number !== newNumber) {
        if(window.confirm(`${persons[idx].name} is already added to phonebook, replace the old number with a new one?`)) {
          const changedPersonNumber = { ...persons[idx], number: newNumber}
          personService
            .update(persons[idx].id, changedPersonNumber)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id !== persons[idx].id ? person : updatedPerson))
              const message = `Updated ${updatedPerson.name}'s number to ${updatedPerson.number}`
              const type = 'success'
              setNotification({ message: message, type: type})
              setTimeout(() => {
                setNotification(null)
              }, 3000)
            })
            .catch(error => {
              const message = error.response.data.error
              const type = 'error'
              setNotification({ message: message, type: type})
              setTimeout(() => {
                setNotification(null)
              }, 3000)
            })
        }
          
      } else {
        alert(`${newName} is already added to phonebook`)
      }
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
      personService.deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== person.id))
          const message = `Deleted ${person.name} from phonebook`
          const type = 'success'
          setNotification({ message: message, type: type})
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(_error => {
          const message = `Information of ${person.name} has already been removed from server`
          const type = 'error'
          setNotification({ message: message, type: type})
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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