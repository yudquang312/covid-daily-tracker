import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
// import { formatNumber } from "../../utils";
import Countup from "react-countup";
import classnames from "classnames";

export default function Cards({
  data: { confirmed, deaths, recovered, lastUpdate },
}) {
  console.log("render cards");
  // console.log({ confirmed, deaths, recovered, lastUpdate });

  if (!confirmed || !deaths || !recovered || !lastUpdate) {
    return "Loading";
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={classnames(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <Countup
                start={0}
                end={confirmed.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textPrimary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of cases of COVID-19.
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={classnames(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <Countup
                start={0}
                end={recovered.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textPrimary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of recoveries from COVID-19.
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={classnames(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <Countup
                start={0}
                end={deaths.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textPrimary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of deaths caused by COVID-19.
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
}
