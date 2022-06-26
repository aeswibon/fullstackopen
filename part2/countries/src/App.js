import React from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = React.useState([])
  const [inputCountry, setCountry] = React.useState("")

  React.useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const handleClick = (name) => {
    setCountry(name)
  }

  return (
    <div>
      <Filter inputCountry={inputCountry} handleCountryChange={handleCountryChange} />
      <Countries countries={countries} inputCountry={inputCountry} handleClick={handleClick} />
    </div>
  );
}

export default App;
