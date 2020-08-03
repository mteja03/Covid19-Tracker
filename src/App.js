import React, {useState, useEffect} from 'react';
import{
  MenuItem,
  FormControl,
  Select, 
} from "@material-ui/core";
import './App.css';

function App() {
  const[countries, setCountries]= useState([]);
  const[country, setCountry]= useState('Worldwide');

    // https://disease.sh/v3/covid-19/countries
    // Useeffect = Runs a piece of code based on a given condition

    useEffect(() => {
      // The code inside here will run once
      // when the component loads and not again
      const getCountriesData = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries =data.map((country) => ({
              name: country.country, //United States, United Kingdom
              value:country.countryInfo.iso2 //UK, USA, FR
            }
          ));
          setCountries(countries);
        })
      }

      
      getCountriesData();
    }, []);

    const onCountryChange = async (event) => {
      const
    }

  return (
    <div className="App"> 
      <div className="app_header">
      <h1>COVID-19 Tracker</h1>
    <FormControl className="app_dropdown">
      <Select variant="outlined" onChange={} value={"country"}>
      <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map(country =>(
            <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          {/* <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Option two</MenuItem>
          <MenuItem value="worldwide">Option 3</MenuItem>
          <MenuItem value="worldwide">Option 4</MenuItem> */}
      </Select>
    </FormControl>

      </div>
    
    {/* Header */}
    {/* Title + Select input dropdown field */}

    {/* InfoBoxs */}
    {/* InfoBoxs */}
    {/* InfoBoxs */}

    {/* Table */}
    {/* Graph */}

    {/* Map */}

    </div>
  );
}

export default App;
