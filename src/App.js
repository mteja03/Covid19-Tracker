import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import corona from './corona.gif';
import world from './world.gif';
import doctors from './doctors.gif';
import ap from './ap.png';
import who from './who.jpg';
import patra from './patra.jpg';
import a from './a.gif';
import b from './b.gif';
import c from './c.gif';
import d from './d.gif';
import e from './e.gif';
import f from './f.gif';
import g from './g.gif';
import h from './h.gif';
import i from './i.gif';
import j from './j.gif';
import k from './k.gif';
import l from './l.gif';
import News from "./News";
import git from './git.png';
import mail from './mail.png';
import lin from './in.png';

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  console.log(casesType);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="page">
            <div className="app_header">
              <h1>COVID-19 Tracker</h1>
              
              <div><img src={corona}/></div>
              {/* <img src={coronaa}/> */}
              <div>
                <FormControl className="app_dropdown">
                  <Select 
                    variant="outlined"
                    value={country}
                    onChange={onCountryChange}
                  >
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                    {countries.map((country) => (
                      <MenuItem value={country.value}>{country.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
      <div className="app">
          <div className="app_left">
            <div className="app_stats">
              <InfoBox
                onClick={(e) => setCasesType("cases")}
                title="Coronavirus Cases"
                isRed
                active={casesType === "cases"}
                cases={prettyPrintStat(countryInfo.todayCases)}
                total={numeral(countryInfo.cases).format("0.0a")}
              />
              <InfoBox
                onClick={(e) => setCasesType("recovered")}
                title="Recovered"
                active={casesType === "recovered"}
                cases={prettyPrintStat(countryInfo.todayRecovered)}
                total={numeral(countryInfo.recovered).format("0.0a")}
              />
              <InfoBox
                onClick={(e) => setCasesType("deaths")}
                title="Deaths"
                isRed
                active={casesType === "deaths"}
                cases={prettyPrintStat(countryInfo.todayDeaths)}
                total={numeral(countryInfo.deaths).format("0.0a")}
              />
            </div>
            <Map 
              countries={mapCountries}
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
            />
          </div>
          <Card className="app_right">
            <CardContent>
              <div className="app_information">
                <h3>Live Cases by Country</h3>
                <img src={world} />
                <Table countries={tableData} />
                <h3>Worldwide new {casesType}</h3>
                <LineGraph casesType={casesType} />
              </div>
            </CardContent>
          </Card>
      </div>

      <div className="news">
        <h1>Covid-19 News</h1>
        <News/>
      </div>

      <div className="donation">
        <h1>Donate Now</h1>
        <img src={doctors}/>
          <div className="grid1">
            <div className="item1">
              <a href="https://apcmrf.ap.gov.in"><img src={ap}/></a>
              {/* <a href="https://apcmrf.ap.gov.in">Donate</a> */}
            </div>
            <div className="item1">
              <a href="https://covid19responsefund.org/en/"><img src={who}/></a>
              {/* <a href="https://covid19responsefund.org/en/">Donate</a> */}
            </div>
            <div className="item1">
              <a href="https://www.akshayapatra.org/covid-relief-services"><img src={patra}/></a>
              {/* <a id="dlink"href="https://www.akshayapatra.org/covid-relief-services">Donate</a> */}
             </div>
          </div>
      </div>
      
      
      <div className="precautions">
        <h2>Precautions</h2>
          <div className="pre">
            <img src={a}/>
            <img src={b}/>
            <img src={c}/>
            <img src={d}/>
            <img src={e}/>  
            <img src={f}/>
            <img src={g}/>
            <img src={h}/>
            <img src={i}/>
            <img src={j}/>
            <img src={k}/>
            <img src={l}/>
          </div>
      </div>
      <div className="footer">
          <a href="https://www.teja.cf">©2020 Designed And Developed by Krishna Mattapalli.</a><br/>
          <a href="https://github.com/mteja03"><img src={git} alt="Git icon"/></a>
          <a href="mailto:mteja0852@gmail.com"><img src={mail} alt="Email icon"/></a>
          <a href="https://www.linkedin.com/in/krishna-teja-mattapalli-112320180/"><img src={lin} alt="Linkedin icon"/></a>            
      </div>
  </div>
  );
};

export default App;
