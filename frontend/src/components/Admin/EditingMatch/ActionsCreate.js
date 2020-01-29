import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Avatar,
  makeStyles
} from "@material-ui/core";
import {
  createActionMatch,
  editActionMatch
} from "../../../actions/actionsMatch";
import { connect } from "react-redux";
import { values } from "ramda";
import matchActions from "../../../utils/matchActions";
import ActionsMap from "./ActionsMap";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import faulsTypes from '../../../utils/faulTypes.js'
const useStyles = makeStyles(theme => ({
  teamsText: {
    color: theme.palette.text.secondary,
    textAlign: "center"
  },
  small: {
    width: theme.spacing(2),
    height: theme.spacing(2)
  },
  textFieldWidth: {
    width: theme.spacing(18),
    textAlign: "center"
  }
}));
const ActionsCreate = ({ match, createActionMatch, editActionMatch }) => {
  const classes = useStyles();
  const [teamHomeOrHost, setteamHomeOrHost] = useState(1);
  const [time, settime] = useState("");
  const [seconds, setseconds] = useState("");
  const [type, settype] = useState(1);
  const [content, setcontent] = useState("");
  const [actionID, setActionID] = useState(0);
  const [editing, setEditing] = useState(false);
  const [faulTypes, setFaulType] = useState(0)

  const loadInitDataAction = action => {
    setteamHomeOrHost(action.teamHomeOrHost);
    settime(action.time);
    setseconds(action.seconds);
    settype(action.type);
    setcontent(action.content);
    setActionID(action.matchactions_id);
    setEditing(true);
    setFaulType(action.faulType)
  };

  const clearForm = () => {
    setteamHomeOrHost(1);
    settime("");
    setseconds("");
    settype(0);
    setcontent("");
    setActionID(0);
    setEditing(false);
    setFaulType(0)
  };
  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Vytvoření události
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
            spacing={0}
            style={{ marginTop: "10px" }}
          >
            <Grid item xs={4} md={2}>
              <Select
                variant={"outlined"}
                type={"text"}
                label={"Tým"}
                onChange={e => setteamHomeOrHost(e.target.value)}
                fullWidth
                value={teamHomeOrHost}
                size="small"
              >
                <MenuItem value={1}>
                  {
                    <Avatar
                      src={match.teamHome.img}
                      className={classes.small}
                    />
                  }
                </MenuItem>
                <MenuItem value={2}>
                  {
                    <Avatar
                      src={match.teamHost.img}
                      className={classes.small}
                    />
                  }
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4} md={3}>
              <Select
                value={type}
                variant={"outlined"}
                type={"text"}
                label={"Typ"}
                onChange={e => settype(e.target.value)}
                fullWidth
                size="small"
              >
                {values(matchActions).map((action, index) => (
                  <MenuItem value={index}>{action}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4} md={3}>
              <Select
                value={faulTypes}
                variant={"outlined"}
                type={"text"}
                label={"Typ"}
                onChange={e => setFaulType(e.target.value)}
                fullWidth
                size="small"
              >
                {values(faulsTypes).map((action, index) => (
                  <MenuItem value={index}>{action}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                onChange={e => settime(e.target.value)}
                variant={"outlined"}
                type={"text"}
                label={"Minuta"}
                fullWidth
                value={time}
              />{" "}
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                onChange={e => setseconds(e.target.value)}
                variant={"outlined"}
                type={"text"}
                label={"Vteřiny"}
                fullWidth
                value={seconds}
              />{" "}
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange={e => setcontent(e.target.value)}
                variant={"outlined"}
                type={"text"}
                label={"Popis"}
                fullWidth
                value={content}
              />{" "}
            </Grid>
            <Grid container
              direction="row"
              justify="center"
              alignItems="center"
              xs={12}
              md={12}>
              <Button
                onClick={() => {
                  editing
                    ? editActionMatch({
                        teamHomeOrHost,
                        time,
                        seconds,
                        content,
                        type,
                        match_id: match.id,
                        faulTypes,
                        matchactions_id: actionID
                      })
                    : createActionMatch({
                        teamHomeOrHost,
                        time,
                        seconds,
                        content,
                        type,
                        faulTypes,
                        match_id: match.id
                      });
                  clearForm();
                }}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ActionsMap match={match} loadInitDataAction={loadInitDataAction} />
    </div>
  );
};

export default connect(() => ({}), { createActionMatch, editActionMatch })(
  ActionsCreate
);
