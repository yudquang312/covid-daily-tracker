import React, { useState, useEffect } from "react";
import { FormControl, NativeSelect } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api";

export default function CountryPicker({ changeCountry }) {
    console.log("render countryPicker");

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        console.log("useEffect countryPicker");
        const getCountries = async () => {
            const getCountries = await fetchCountries();
            // console.log(getCountries);
            setCountries(getCountries);
        };
        getCountries();
    }, []);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect
                defaultValue=""
                onChange={(event) => changeCountry(event.currentTarget.value)}
            >
                <option value="global">Global</option>
                {countries.map((country, index) => (
                    <option key={index} value={country}>
                        {country}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    );
}
