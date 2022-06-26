import React from "react";
import Weather from "./Weather";
import axios from "axios";
import { api_key } from "../const";

const Country = ({ country }) => {
  const [weather, setWeather] = React.useState({});
  React.useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data.current)
      }).catch(error => {
        console.log(error);
      })
  }, [country.capital]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      capital {country.capital}<br />
      population {country.population}<br />

      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name}`} width="25%" height="25%" />
      <Weather city={country.capital} current={weather} />
    </div>
  )
}

const Countries = (props) => {
  const { countries, inputCountry, handleClick } = props;
  const filteredCountries = countries.filter((country) => country.name?.common?.toLowerCase().includes(inputCountry.toLowerCase()))

  if (filteredCountries.length === 1) {
    return (
      <div>
        <Country country={filteredCountries[0]} />
      </div>
    )
  }

  if (filteredCountries.length !== 1 && filteredCountries.length <= 10) {
    return (
      <div>
        {filteredCountries.map((country, index) =>
          <div key={index}>
            {country.name.common} <button value={country.name.common} onClick={() => handleClick(country.name.common)}>show</button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      Too many matches, specify another filter
    </div>
  )
}

export default Countries;