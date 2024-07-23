import Weather from './Weather'


const Countries = ({ countries,setSearchBox }) => {
    

    
    console.log('in component', countries)
    console.log('length', countries.length)


    const showButton=(area,name)=>{

        console.log('button clicked for', area)
        setSearchBox(name)

    }

    if (countries.length == 1) {
        
        console.log('match found')
        return (
            <div>
                <h1>
                    {countries[0].name.common}
                </h1>
                <p>capital {countries[0].capital}</p>
                <p>area {countries[0].area}</p>
                <h2>languages:
                </h2>

                {console.log(countries)}
                <ul>
                {Object.keys(countries[0].languages).map(country => <li key = {countries[0].area}>{countries[0].languages[country]}</li>)}
                </ul>
                <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
                <Weather capital = {countries[0].capital} lat= {countries[0].capitalInfo.latlng[0]} lon ={countries[0].capitalInfo.latlng[1]}></Weather>


            </div>
        )

    }
    else if (countries.length <= 10) {
        console.log('return')
        return (
            <div>
                {countries.map(country => <p key ={country.area}>{country.name.common} <button onClick={()=>{showButton(country.area, country.name.common)}}>show</button></p>)}
            </div>

        )
    }
    else {
        return (
            <p>Too many matches, specity another filter</p>
        )
    }

}

export default Countries


