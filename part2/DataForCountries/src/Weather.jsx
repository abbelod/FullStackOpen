import axios from "axios"
import { useEffect, useState } from "react"

const api_key = import.meta.env.VITE_SOME_KEY


const Weather = ({capital, lat, lon})=>{

    const [weather, setWeather] = useState(null)

useEffect(()=>{

    axios.get( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`).then(response=>{
        console.log(response.data)
        setWeather(response.data)
    })

},  [])

if(weather)
{
return(

<div>
<h2>Weather in {capital}</h2>
<p>temperature: {weather.main.temp}</p>
<p>wind: {weather.wind.speed} m/s</p>
<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
<h3>{weather.weather[0].description}</h3>

</div>
)

}
else{
    return(
        <p>loading</p>
    )
}

}

export default Weather