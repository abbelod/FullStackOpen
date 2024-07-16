import { useState } from 'react'

import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('firstName')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')


  const buttonSubmit = (event) => {
    event.preventDefault();
    console.log('submit called')

    const newPerson = [{ name: newName, number: newNumber }]

    if (persons.findIndex((person) => person.name.toLowerCase() === newName.toLowerCase()) != -1) {
      console.log('Name Already exists')
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
    }
    else {
      setPersons(persons.concat(newPerson))
    }



  }

  const handleformChange = (event) => {
    console.log('onchangecalled')
    console.log(event.target.value)
    setNewName(event.target.value)

  }

  const handleNumberChange = (event) => {
    console.log('numberChangeCalled')
    console.log(event.target.value)
    setNewNumber(event.target.value)

  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter func = {handleSearchChange}></Filter>
      <div>debug: {newName}</div>
      <PersonForm handleformChange = {handleformChange} handleNumberChange = {handleNumberChange} buttonSubmit = {buttonSubmit}></PersonForm>

    
      <h2>Numbers</h2>

      
    <Persons persons = {persons} newSearch = {newSearch}></Persons>

    </div>
  )


}




export default App