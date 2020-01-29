import React from "react";
import MatchActionHome from "../../Match/MatchActionHome";
import { Grid, Paper, Typography, Button,  IconButton } from "@material-ui/core";
import matchActions from "../../../utils/matchActions";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {deleteActionMatch} from '../../../actions/actionsMatch'
import {connect} from 'react-redux'

const ActionsMap = ({ match, loadInitDataAction, deleteActionMatch }) => {
  const classes = {
    alignItems: "center"
  };
  return match.actions.map((action) => (
    <div>
      <Paper
        style={{
          width: "100%",
          height: "fit-content",
          paddingTop:'5px',
          paddingBottom:'5px',
          display: "flex",
          alignItems: "center"
        }}
      >
        <Grid container md={12} xs={12} style={classes}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            xs={2}
            md={2}
          >
            <Typography variant={"body1"}>{action.time}</Typography>
            <Typography variant={"body1"}>:</Typography>
            <Typography variant={"body1"}>{action.seconds}</Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            xs={1}
            md={1}
          >
            {matchActions[action.type]}
          </Grid>
          <Grid item xs={8}>
            <Typography variant={"body1"}>{action.content}</Typography>
          </Grid>
        </Grid>

        <IconButton color="primary">
          <EditIcon onClick={() => loadInitDataAction(action)} />
        </IconButton>

        <IconButton color="secondary" >
          <DeleteIcon onClick={()=>window.confirm('Opravdu smazat ?') && deleteActionMatch(action)}/>
        </IconButton>
      </Paper>
    </div>
  ));
};

export default connect(()=>({}),{deleteActionMatch})(ActionsMap);
