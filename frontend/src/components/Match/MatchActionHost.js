import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import matchActions from "../../utils/matchActions";
const MatchActionHost = ({ action: { time, seconds, content,type } }) => {
  const classes = {
    alignItems: "center"
  };
  return (
    <Paper
      style={{
        width: "100%",
        height: "40px",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Grid container md={12} xs={12} style={classes} justify="flex-end">
        <Grid item xs={5} style={{textAlign: 'right'}} >
             <Typography variant={"body1"}>{content}</Typography>
        </Grid>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
          xs={1} md={1}>
            {matchActions[type]}
        </Grid>
       
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          xs={2} md={1}
        >
          <Typography variant={"body1"}>{time}</Typography>
          <Typography variant={"body1"}>:</Typography>
          <Typography variant={"body1"}>{seconds}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MatchActionHost;
