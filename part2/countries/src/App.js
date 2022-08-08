import axios from "axios";
import { useEffect, useState } from "react";
import Countries from "./components/Countries";
import Filter from "./components/Filter";

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const countriesFilter = ({name}) => name.toLowerCase().includes(filter.toLowerCase()) ? true : false

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} countriesFilter={countriesFilter}/>
    </div>
  )
}

export default App;
