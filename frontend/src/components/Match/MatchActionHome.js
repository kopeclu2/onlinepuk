import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import matchActions from "../../utils/matchActions";
import faulTypes from "../../utils/faulTypes";
const MatchActionHome = ({
  action: { time, seconds, content, type, faulType }
}) => {
  const classes = {
    alignItems: "center"
  };
  return (
    <Paper
      style={{
        width: "100%",
        height: "fit-content",
        paddingTop: "8px",
        paddingBottom: "8px",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Grid container md={10} xs={12} style={classes}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          xs={2}
          md={1}
        >
          <Typography variant={"body1"}>{time}</Typography>
          <Typography variant={"body1"}>:</Typography>
          <Typography variant={"body1"}>{seconds}</Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          xs={1}
          md={1}
        >
          {matchActions[type]}
        </Grid>
        <Grid container
          direction="row" alignItems="center" xs={9}>
          <Typography
            variant={"body1"}
          >{content}</Typography>
          {faulType !== 0 && <p style={{fontSize: '0.8rem', color: 'darkgray',paddingLeft:'5px'}}>{`( ${faulTypes[faulType]} )`}</p> }    
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MatchActionHome;
