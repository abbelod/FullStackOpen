import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonService from './services/persons'

import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('firstName')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')


  useEffect(() => {

    PersonService.getAll().then(Persons=> setPersons(Persons))
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setPersons(response.data)
    //   })

  }, [])

  const buttonSubmit = (event) => {
    event.preventDefault();
    console.log('submit called')

    let newPerson = { name: newName, number: newNumber}

   let personIndex = persons.findIndex((person) => person.name.toLowerCase() === newName.toLowerCase())
    if (personIndex != -1){
      console.log('Name Already exists')
      if(window.confirm( newName  +' is already added to phonebook. Update Number?'))
      {
        PersonService.update(persons[personIndex].id, newPerson).then(response=>{
        PersonService.getAll().then(Persons=> setPersons(Persons))

        })
      }
      setNewName('')
    }
    else {

      PersonService.create(newPerson).then(person=>{
        console.log(persons)
        setPersons(persons.concat(person))
      })

      // axios.post('http://localhost:3001/persons', newPerson)
      // .then(response=> {
      //   console.log(response)
      //   setPersons(persons.concat(newPerson))
      // })
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


  const deletePerson = (id)=>{
    console.log('delete for ', id, 'called')
   console.log('Delete,  ?', persons.filter(person=> person.id === id).name)

   const toDelete = persons.filter(person=> person.id === id)
   console.log(toDelete[0].name)

    if(window.confirm('Delete ' + toDelete[0].name +  ' ?')){
      PersonService.deleteP(id).then(response=>{
        console.log('deleted from server')
        setPersons(persons.filter(person=> person.id != id))
      })


    }
    else{
      return
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter func = {handleSearchChange}></Filter>
      <div>debug: {newName}</div>
      <PersonForm handleformChange = {handleformChange} handleNumberChange = {handleNumberChange} buttonSubmit = {buttonSubmit}></PersonForm>

    
      <h2>Numbers</h2>

      
    <Persons persons = {persons} newSearch = {newSearch} deletePerson = {deletePerson}></Persons>

    </div>
  )


}




export default App