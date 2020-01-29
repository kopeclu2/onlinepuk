import React from "react";
import { Field } from "redux-form";
import { Grid, makeStyles, TextField, Button } from "@material-ui/core";
import { TextFieldText, DateField, CheckInput } from "../../ReduxComponents";
import { updateMatchInfo } from "../../../actions/matches";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

const MatchInfo = ({
  match,
  updateMatchInfo,
  matchSocketLive,
  matchFinished
}) => {
  const classes = useStyles();
  const socketEmit = () => {};
  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Obecné údaje o zápase
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
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
            <Grid item xs={6} md={4}>
              <Field
                name={"matchState"}
                component={TextFieldText}
                label={"Stav zapasu"}
              />
            </Grid>

            <Grid item xs={6} md={4}>
              <Field
                name={"stadion"}
                component={TextFieldText}
                label={"Stadion"}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControlLabel
                control={
                  <Field
                    name="live"
                    component={CheckInput}
                    onChange={(e, newValue) =>
                      JSON.parse(localStorage.getItem("LIVE_NOTIF")) &&
                      window.confirm("Zapas bude live s norifikaci") &&
                      matchSocketLive(newValue)
                    }
                  ></Field>
                }
                label="Živě"
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControlLabel
                control={
                  <Field
                    name="finished"
                    component={CheckInput}
                    onChange={(e, newValue) =>
                      JSON.parse(localStorage.getItem("LIVE_NOTIF")) &&
                      window.confirm("Zapas nebude live a bude dohran") &&
                      matchFinished(newValue)
                    }
                  ></Field>
                }
                label="Dohráno"
              />
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              xs={12}
              md={12}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => updateMatchInfo(match.id)}
              >
                Uložit
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default connect(() => ({}), { updateMatchInfo })(MatchInfo);
