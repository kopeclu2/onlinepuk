import React from "react";
import { Field } from "redux-form";
import { Grid, makeStyles, TextField, Button } from "@material-ui/core";
import { TextFieldText, DateField } from "../../ReduxComponents";
import {updateMatchInfo} from '../../../actions/matches'
import {connect} from 'react-redux'
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
    width: theme.spacing(25),
    textAlign: "center"
  }
}));

const MatchInfo = ({ match,updateMatchInfo }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      md={12}
      xs={12}
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
      style={{ marginTop: "10px" }}
    >
      <Grid item xs={6} md={3}>
        <Field
          name={"matchState"}
          component={TextFieldText}
          label={"Stav zapasu"}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Field name={"date"} component={DateField} label={"Datum"} className={classes.textFieldWidth} />
      </Grid>
      <Grid item xs={6} md={3}>
        <Field name={"stadion"} component={TextFieldText} label={"Stadion"} />
      </Grid>
      <Grid item xs={12} md={1}>
        <Button onClick={() => updateMatchInfo(match.id)}>Save</Button>
      </Grid>
    </Grid>
  );
};

export default connect(()=>({}), {updateMatchInfo})(MatchInfo);
