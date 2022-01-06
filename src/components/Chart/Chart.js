import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Doughnut } from "react-chartjs-2";
import styles from "./Chart.module.css";

export default function Chart({
    country,
    data: { confirmed, recovered, deaths },
}) {
    console.log("render chart");

    const [dailyData, setDailyData] = useState({});

    // useEffect(() => {
    //     console.log("useEffect");

    //     const fetch = async () => {
    //         const fetchDaily = async () => {
    //             setDailyData(await fetchDailyData());
    //             // console.log(dailyData);
    //         };
    //         await fetchDaily();
    //         // console.log(dailyData);
    //     };

    //     fetch();
    // }, []);

    useEffect(() => {
        console.log("useEffect chart");
        const fetchDaily = async () => {
            setDailyData(await fetchDailyData());
            // console.log(dailyData);
        };

        fetchDaily();
    }, []);

    // useEffect(() => {
    //     console.log("useEffect 2");
    //     console.log(dailyData);
    // }, [dailyData]);

    const lineChart = dailyData[0] ? (
        <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [
                    {
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: "Infected",
                        borderColor: "rgba(0,0,255,0.5)",
                        backgroundColor: "rgba(0,0,255,0.3)",
                        fill: true,
                        borderDashOffset: 0.0,
                        lineTension: 0.1,
                        pointRadius: 2,
                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: "Deaths",
                        borderColor: "rgba(255,0,0,0.5)",
                        backgroundColor: "rgba(255,0,0,0.3)",
                        fill: true,
                        borderDashOffset: 0.0,
                        lineTension: 0.1,
                        pointRadius: 2,
                    },
                ],
            }}
        />
    ) : null;

    const doughnutChart = country ? (
        <Doughnut
            data={{
                labels: ["Active", "Recovered", "Deaths"],
                datasets: [
                    {
                        data: [
                            confirmed.value - recovered.value - deaths.value,
                            recovered.value,
                            deaths.value,
                        ],
                        backgroundColor: [
                            "rgba(0, 0, 255, 0.5)",
                            "rgba(0, 255, 0, 0.5)",
                            "rgba(255, 0, 0, 0.5)",
                        ],
                        hoverBackgroundColor: [
                            "rgba(0, 0, 255, 0.7)",
                            "rgba(0, 255, 0, 0.7)",
                            "rgba(255, 0, 0, 0.7)",
                        ],
                    },
                ],
            }}
        />
    ) : null;

    return (
        <div className={styles.container}>
            {country && country !== "" && country !== "global"
                ? doughnutChart
                : lineChart}
        </div>
    );
}
