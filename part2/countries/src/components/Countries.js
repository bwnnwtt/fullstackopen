import { useEffect, useState } from "react"
import axios from "axios";

const Country = ({country}) => {

    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState({})

    const hook = () => {
        // console.log("capital", country.capital)
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                const {temperature,weather_icons,wind_speed,wind_dir} = response.data.current
                setWeather({
                    temperature,
                    weather_icons,
                    wind_speed,
                    wind_dir
                })
                // console.log(weather)
                // console.log(response.data)
            })
    }
    useEffect(hook,[api_key,country.capital])
    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h2>languages:</h2>
            <ul>
                {country.languages.map((language , index) => <li key={index}>{language.name}</li>)}
            </ul>
            <img alt={country.flag} src={country.flags.png} />
            <h2>Weather in {country.capital}</h2>
            <div>temperature {weather.temperature} Celcius</div>
            <img alt={weather.weather_icons} src={weather.weather_icons} />
            <div>wind {weather.wind_speed} km/h</div>
        </div>
    )
}

const Countries = ({countries, countriesFilter}) => {
    
    const filteredCountries = countries.filter(countriesFilter)
    const [showCountry, setShowCountry] = useState({})

    const handleClick = (country) => {
        setShowCountry(country)
    }

    if (filteredCountries.length > 10) {
        return (
            <div>
               Too many matches, specify another filter 
            </div>
        )
    } else if (filteredCountries.length === 1) {
        return (
            <div>
                {filteredCountries.map((country, index) => <Country key={index} country={country} />)}
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    {filteredCountries.map(
                        (country, index) => 
                            <div key={index}>
                                {country.name} 
                                <button key={index} onClick={() => handleClick(country)} >show</button>
                            </div>
                        
                    )}
                </div>
                <div>
                   {showCountry.languages !== undefined && <Country country={showCountry} />}
                </div>
            </div>
        )
    }
}

export default Countries