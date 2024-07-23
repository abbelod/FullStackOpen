import { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './Countries'


const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const urllocal = 'http://localhost:3001/countries'


function App() {

  const [searchBox, setSearchBox] = useState('')
  const [countries, setCountries] = useState([])


  const inputChange = (event) => {

    setSearchBox(event.target.value)
  }


  useEffect(() => {

    axios.get(url).then(response => {
      console.log('axios')
      console.log(response.data)


     setCountries(response.data.filter(country => {
        if (country.name.common.toLowerCase().search(searchBox.toLowerCase()) != -1) {
          return true
        }
        return false;
      }))

    })

  }, [searchBox])

  console.log('render', countries.length, 'Countries')

  return (
    <div>
      Find Countries
      <input type="text" onChange={inputChange} />

      {console.log(countries)}

      <Countries countries = {countries} setSearchBox={setSearchBox}></Countries>
  
    </div>

   
  )
}

export default App
