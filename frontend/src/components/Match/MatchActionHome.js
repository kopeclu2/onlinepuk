import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import matchActions,{goalActions,otherSymbols,periodActions} from "../../utils/matchActions";
import faulTypes from "../../utils/faulTypes";
import { goalTypes } from "../../utils/goalTypes";
const MatchActionHome = ({
  action: { time, seconds, content, type, faulType, generalType }
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
            {generalType ===0  && goalActions[type].desc}
            {generalType ===1  && matchActions[type].desc}
            {generalType ===2  && periodActions[type].desc}
            {generalType ===3  && otherSymbols[type].desc}
        </Grid>
        <Grid container
          direction="row" alignItems="center" xs={9}>
          <Typography
            variant={"body1"}
          >{content}</Typography>
          {faulType !== 0 && <p style={{fontSize: '0.8rem', margin:'0',color: 'darkgray',paddingLeft:'20px'}}>{'('}
            {generalType ===1  && faulTypes[faulType]}
            {generalType ===0  && goalTypes[faulType].desc}
            {')'}
          </p> }    
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MatchActionHome;
