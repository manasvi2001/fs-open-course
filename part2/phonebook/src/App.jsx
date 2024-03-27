import { useState } from 'react'

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

const Persons = ({ persons }) => {
  return <>
    {persons.map(person =>
      <div key={person.id}>
        {person.name} {person.number}
      </div>
    )}
  </>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleInput = (event, setter) => {
    setter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName.trim() === '' || newNumber.trim() === '') {
      return
    }

    if (persons.findIndex(person => person.name === newName || person.number === newNumber) !== -1) {
      alert(`${newName} ${newNumber} is already added to phonebook`)
      return
    }

    setPersons(prev => [...prev, { name: newName, number: newNumber, id: prev[prev.length - 1].id + 1 }])
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} handleInput={handleInput} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleInput={handleInput} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App