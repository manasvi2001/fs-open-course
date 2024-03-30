import { useState, useEffect } from 'react'
import personsService from './services/persons'

const Notification = ({ successMessage, errorMessage }) => {
  return <>
    {successMessage ?
      <div className='success'>
        {successMessage}
      </div>
      : null
    }
    {errorMessage ?
      <div className='error'>
        {errorMessage}
      </div>
      : null
    }
  </>
}

const Filter = ({ filter, setFilter, handleInput }) => {
  return <div>
    filter shown with: <input type="text" value={filter} onChange={(event) => handleInput(event, setFilter)} />
  </div>
}

const PersonForm = ({ addPerson, newName, setNewName, newNumber, setNewNumber, handleInput }) => {
  return <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={(event) => handleInput(event, setNewName)} />
    </div>
    <div>
      number: <input value={newNumber} onChange={(event) => handleInput(event, setNewNumber)} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
}

const Persons = ({ persons, deletePerson }) => {
  return <>
    {persons.map(person =>
      <div key={person.id}>
        {person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
      </div>
    )}
  </>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const handleInput = (event, setter) => {
    setter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName.trim() === '' || newNumber.trim() === '') {
      return
    }

    const personIsPresent = persons.find(person => person.name === newName)
    if (personIsPresent) {
      const result = confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
      if (result) {
        updatePerson(personIsPresent.id)
      }
      return
    }

    personsService
      .create({
        name: newName,
        number: newNumber,
        id: `${Number(persons[persons.length - 1].id) + 1}`
      })
      .then(person => {
        setPersons(prev => [...prev, person])
        setNewName('')
        setNewNumber('')
        setSuccessMessage(
          `Added ${person.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const updatePerson = (id) => {
    personsService
      .update({
        name: newName,
        number: newNumber,
        id: id
      })
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id === id ? updatedPerson : person))
        setNewName('')
        setNewNumber('')
      })
      .catch(_ => {
        console.log('reached here')
        setErrorMessage(
          `Information of ${newName} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (id, name) => {
    const result = confirm(`Delete ${name}?`)
    if (result) {
      personsService
        .remove(id)
        .then(_ => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <Filter filter={filter} setFilter={setFilter} handleInput={handleInput} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleInput={handleInput} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App