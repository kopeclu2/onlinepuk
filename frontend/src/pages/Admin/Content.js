import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CreateMatch from "../../components/Admin/CreateMatch";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import MapMatchesForEdit from '../../components/Admin/MapMatchesForEdit.js'
import {
  MenuItem,
  Divider,
  Avatar,
  Fab,
  IconButton,
  Checkbox,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import { loadMatches } from "../../actions/matches";
import { deleteMatch } from "../../actions/matches";
import {
  addMatchOpen,
  addMatchClose,
  editingMatchOpen,
  editingMatchClose
} from "../../actions/uiActions";
import EditingMatch from "../../components/Admin/EditingMatch";
import moment from "moment";
const styles = theme => ({
  "@keyframes blinker": {
    from: { opacity: 1 },
    to: { opacity: 0 }
  },
  blinkingText: {
    animationName: "$blinker",
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    color: "red"
  },
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden"
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: "block"
  },
  addUser: {
    marginRight: theme.spacing(1)
  },
  contentWrapper: {
    margin: "40px 16px"
  },
  noVisible: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  greenDot: {
    color: 'green'
  }
});

function Content({
  classes,
  matches,
  loadMatches,
  deleteMatch,
  addMatch,
  dispatch,
  addMatchOpen,
  addMatchClose,
  editMatch,
  editingMatchOpen,
  editingMatchClose
}) {
  useEffect(() => loadMatches(), []);
  return (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              {editMatch ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => editingMatchClose()}
                >
                  <ArrowBackIcon />
                </Button>
              ) : addMatch ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addMatchClose()}
                >
                  <ArrowBackIcon />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => addMatchOpen()}
                  color="primary"
                  className={classes.addUser}
                >
                  Přidej zápas
                </Button>
              )}
            </Grid>
          </Grid>
          <FormControlLabel
            control={
              <Switch
                checked={JSON.parse(localStorage.getItem('LIVE_NOTIF'))}
                onChange={(event) => localStorage.setItem('LIVE_NOTIF', event.target.checked)}
              />
            }
            label="Editovat s norifikacemi ? "
          />
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        {editMatch ? (
          <EditingMatch />
        ) : addMatch ? (
          <CreateMatch />
        ) : (
          <div>
            <MapMatchesForEdit matches={matches} deleteMatch={deleteMatch} editingMatchOpen={editingMatchOpen} classes={classes}/>
          </div>
        )}
      </div>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => ({
    matches: state.matches.matches,
    addMatch: state.ui.addMatchBool,
    editMatch: state.ui.editingMatch.bool
  }),
  {
    loadMatches,
    editingMatchOpen,
    editingMatchClose,
    deleteMatch,
    addMatchOpen,
    addMatchClose
  }
)(withStyles(styles)(Content));
