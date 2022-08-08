import { useEffect, useState } from "react"

const Country = ({country}) => {
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