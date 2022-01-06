import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    // console.log(country);
    let changeUrl = url;
    if (country && country !== "global") {
        changeUrl += `/countries/${country}`;
    }
    try {
        const {
            data: { confirmed, deaths, recovered, lastUpdate },
        } = await axios.get(changeUrl);
        return {
            confirmed,
            deaths,
            recovered,
            lastUpdate,
        };
    } catch (error) {
        console.log(error);
    }
};

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        return data.slice(-60).map((dailyData) => {
            return {
                confirmed: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                date: dailyData.reportDate,
            };
        });
    } catch (error) {
        console.log(error);
    }
};

export const fetchCountries = async () => {
    try {
        const {
            data: { countries },
        } = await axios.get(`${url}/countries`);
        // console.log(data);
        // console.log(countries);
        return countries.map(({ name }) => name);
    } catch (error) {
        console.log(error);
    }
};

export const fetchDataOfCountry = async (country) => {
    try {
        const { confirmed, deaths, recovered, lastUpdate } = await axios.get(
            `${url}/countries/${country}`
        );
        return {
            confirmed: confirmed.value,
            deaths: deaths.value,
            recovered: recovered.value,
            lastUpdate,
        };
    } catch (error) {
        console.log(error);
    }
};
