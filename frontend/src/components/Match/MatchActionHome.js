import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import matchActions,{goalActions,otherSymbols,periodActions} from "../../utils/matchActions";
import faulTypes from "../../utils/faulTypes";
import { goalTypes } from "../../utils/goalTypes";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
const MatchActionHome = ({
  action: { time, seconds, content, type, faulType, generalType }, width
}) => {
  const mobile = isWidthDown('sm', width);
  const classes = {
    alignItems: "center"
  };
  return (
    <Paper
      style={{
        width: "100%",
        height: "fit-content",
        paddingTop: mobile ? "4px" : "8px",
        paddingBottom: mobile ? "4px" : "8px",
        display: "flex",
        alignItems: "center"
      }}>
      <Grid container md={12} xs={12} style={classes} >
      <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          xs={2}
          md={1}
        >
          <Typography variant={"body1"} style={mobile && {fontSize: '0.8rem'}}>{time}</Typography>
          <Typography variant={"body1"} style={mobile && {fontSize: '0.8rem'}}>:</Typography>
          <Typography variant={"body1"} style={mobile && {fontSize: '0.8rem'}}>{seconds}</Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          xs={1}
          md={1}
          style={mobile && {transform: 'scale(0.8)'}}
        >
          {generalType ===0  && goalActions[type].desc}
            {generalType ===1  && matchActions[type].desc}
            {generalType ===2  && periodActions[type].desc}
            {generalType ===3  && otherSymbols[type].desc}
        </Grid>

        <Grid
          container
          direction="row"
          alignItems={"center"}
          xs={9}
        
        >
          <Typography variant={"body1"} style={mobile && {fontSize: '0.8rem'}}>{content}</Typography>
          {faulType !== 0 && <p style={{fontSize: mobile ? '0.7rem' : '0.8rem', margin:'0',color: 'darkgray',paddingLeft:'20px'}}>{'('}
            {generalType ===1  && faulTypes[faulType]}
            {generalType ===0  && goalTypes[faulType].desc}
            {')'}
          </p> }    
          
        </Grid>
        
       
      </Grid>
    </Paper>
  );
};

export default withWidth()(MatchActionHome);
