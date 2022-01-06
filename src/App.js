import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styles from "./App.module.css";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import SummaryTable from "./components/SummaryTable/SummaryTable";
import covidImage from "./images/covidImage.png";

// import { Cards, Chart, CountryPicker } from "./components";

import { fetchData } from "./api";

function App() {
  console.log("render app");

  const [data, setData] = useState({});
  const [country, setCountry] = useState("");
  console.log(country);
  useEffect(() => {
    console.log("useEffect app");
    const getData = async () => {
      const getData = await fetchData();
      // console.log(getData);
      setData(getData);
    };
    getData();
  }, []);

  useEffect(() => {
    console.log("useEffect Country");
    console.log(country);
  }, [country]);

  const changeCountry = async (country) => {
    console.log("change country", country);
    setData(await fetchData(country));
    setCountry(country);
  };

  return (
    <Router>
      <div className={styles.container}>
        <Link to="/">
          <img className={styles.image} src={covidImage} alt="COVID-19" />
        </Link>

        <Cards data={data} />
        <CountryPicker changeCountry={changeCountry} />
        <Chart country={country} data={data} />
        <SummaryTable />
        {/* <Chart /> */}
      </div>
    </Router>
  );
}

export default App;
