const Country = ({country}) => {
    console.log(country)
    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h2>languages:</h2>
            <ul>
                {country.languages.map(language => <li>{language.name}</li>)}
            </ul>
            <img alt={country.flag} src={country.flags.png} />
        </div>
    )
}

const Countries = ({countries, countriesFilter}) => {
    // console.log(countries.filter(countriesFilter).length)
    const filteredCountries = countries.filter(countriesFilter)

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
                {filteredCountries.map((country, index) => <div key={index}>{country.name}</div>)}
            </div>
        )
    }
}

export default Countries