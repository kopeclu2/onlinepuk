import React from "react";
import { Grid, Typography, Avatar, makeStyles } from "@material-ui/core";
import { Field } from "redux-form";
import { TextFieldNumber } from "../../ReduxComponents";


const useStyles = makeStyles(theme => ({
  teamsText: {
    color: theme.palette.text.secondary,
    textAlign: "center"
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  textFieldWidth: {
    width: theme.spacing(8),
    textAlign: "center"
  }
}));

const FirstRowInfo = ({ match, scoreGoalSocket }) => {
  const classes = useStyles();
  
  return (
    <Grid
      container
      md={12}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={2}>
        <Avatar
          className={classes.large}
          alt="Remy Sharp"
          src={match.teamHome.img}
        />
      </Grid>
      <Grid
        container
        xs={8}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Field
          name="scoreHome"
          component={TextFieldNumber}
          className={classes.textFieldWidth}
          parse={Number}
        />
        <Typography variant={"h2"}>:</Typography>
        <Field
          name="scoreHost"
          component={TextFieldNumber}
          className={classes.textFieldWidth}
          onBlur={(e) => scoreGoalSocket() }
          parse={Number}
        />
      </Grid>
      <Grid item xs={2}>
        <Avatar
          alt="Remy Sharp"
          className={classes.large}
          src={match.teamHost.img}
        />
      </Grid>
    </Grid>
  );
};

export default FirstRowInfo;
