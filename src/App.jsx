import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@mui/material";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import corona from './images/corona.gif';
import world from './images/world.gif';
import doctors from './images/doctors.gif';
import ap from './images/ap.png';
import who from './images/who.jpg';
import patra from './images/patra.jpg';
import a from './images/a.gif';
import b from './images/b.gif';
import c from './images/c.gif';
import d from './images/d.gif';
import e from './images/e.gif';
import f from './images/f.gif';
import g from './images/g.gif';
import h from './images/h.gif';
import i from './images/i.gif';
import j from './images/j.gif';
import k from './images/k.gif';
import l from './images/l.gif';
import News from "./News";
import git from './images/git.png';
import mail from './images/mail.png';
import lin from './images/in.png';

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
    const getWorldwideData = async () => {
      try {
        const response = await fetch("https://disease.sh/v3/covid-19/all");
        const data = await response.json();
        setCountryInfo(data);
      } catch (error) {
        console.error("Failed to load worldwide data", error);
      }
    };

    getWorldwideData();
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      try {
        const response = await fetch(
          "https://disease.sh/v3/covid-19/countries"
        );
        const data = await response.json();
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
          flag: country.countryInfo.flag,
        }));
        let sortedData = sortData(data);
        setCountries(countries);
        setMapCountries(data);
        setTableData(sortedData);
      } catch (error) {
        console.error("Failed to load countries data", error);
      }
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setInputCountry(countryCode);
      setCountryInfo(data);
      if (countryCode === "worldwide") {
        setMapCenter([34.80746, -40.4796]);
        setMapZoom(3);
      } else {
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      }
    } catch (error) {
      console.error("Failed to load country data", error);
    }
  };

  return (
    <div className="page">
      <div className="app_header">
        <h1>COVID-19 Tracker</h1>

        <div><img src={corona} alt="Coronavirus animation" /></div>
        <div>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}

              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.name}
                </MenuItem>
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
            <InfoBox
              title="Total Tests"
              isRed
              active={casesType === "tests"}
              cases={numeral(countryInfo.tests).format("0.0a")}
              total={numeral(countryInfo.tests).format("0.0a")}
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
              <img src={world} alt="Spinning globe" />
              <Table countries={tableData} />
              <h3>Worldwide new {casesType}</h3>
              <LineGraph casesType={casesType} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="news">
        <h1>Covid-19 News</h1>
        <News />
      </div>

      <div className="donation">
        <h1>Donate Now</h1>
        <img src={doctors} alt="Doctors illustration" />
        <div className="grid1">
          <div className="item1">
            <a href="https://apcmrf.ap.gov.in"><img src={ap} alt="AP CM Relief Fund" /></a>
          </div>
          <div className="item1">
            <a href="https://covid19responsefund.org/en/"><img src={who} alt="WHO COVID-19 Response Fund" /></a>
          </div>
          <div className="item1">
            <a href="https://www.akshayapatra.org/covid-relief-services"><img src={patra} alt="Akshaya Patra COVID relief" /></a>
          </div>
        </div>
      </div>


      <div className="precautions">
        <h2>Precautions</h2>
        <div className="pre">
          <img src={a} alt="Precaution 1" />
          <img src={b} alt="Precaution 2" />
          <img src={c} alt="Precaution 3" />
          <img src={d} alt="Precaution 4" />
          <img src={e} alt="Precaution 5" />
          <img src={f} alt="Precaution 6" />
          <img src={g} alt="Precaution 7" />
          <img src={h} alt="Precaution 8" />
          <img src={i} alt="Precaution 9" />
          <img src={j} alt="Precaution 10" />
          <img src={k} alt="Precaution 11" />
          <img src={l} alt="Precaution 12" />
        </div>
      </div>
      <div className="footer">
        <a href="https://www.teja.cf">©2020 Designed And Developed by Krishna Mattapalli.</a><br />
        <a href="https://github.com/mteja03"><img src={git} alt="Git icon" /></a>
        <a href="mailto:mteja0852@gmail.com"><img src={mail} alt="Email icon" /></a>
        <a href="https://www.linkedin.com/in/krishna-teja-mattapalli-112320180/"><img src={lin} alt="Linkedin icon" /></a>
      </div>
    </div>
  );
};

export default App;
