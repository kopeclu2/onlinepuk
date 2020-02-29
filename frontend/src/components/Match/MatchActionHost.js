import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import matchActions,{goalActions,otherSymbols,periodActions} from "../../utils/matchActions";
import faulTypes from "../../utils/faulTypes";
import { goalTypes } from "../../utils/goalTypes";
const MatchActionHost = ({
  action: { time, seconds, content, type, faulType, generalType }
}) => {
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
      }}>
      <Grid container md={12} xs={12} style={classes} justify="flex-end">
        <Grid
          container
          direction="row"
          alignItems={"center"}
          xs={9}
          style={{ textAlign: "right" }}
          justify="flex-end"
        >
          {faulType !== 0 && <p style={{fontSize: '0.8rem', margin:'0',color: 'darkgray',paddingRight:'20px'}}>{'('}
            {generalType ===1  && faulTypes[faulType]}
            {generalType ===0  && goalTypes[faulType].desc}
            {')'}
          </p> }    
          <Typography variant={"body1"}>{content}</Typography>
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
      </Grid>
    </Paper>
  );
};

export default MatchActionHost;
