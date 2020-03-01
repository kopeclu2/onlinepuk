import React, {useEffect} from "react";
import { connect } from "react-redux";
import { find, propEq } from "ramda";
import { Container } from "@material-ui/core";
import MatchInfo from "../Admin/EditingMatch/matchInfo";
import { reduxForm, formValueSelector } from "redux-form";
import FirstRowInfo from "./EditingMatch/FirstRowInfo";
import openSocket from "socket.io-client";
import ActionsCreate from "./EditingMatch/ActionsCreate";
import ActionsMap from "./EditingMatch/ActionsMap";
import { checkForValidUser } from "../../actions/checkForValidUser";

const socket = openSocket.connect("http://localhost:4000");

let EditingMatch = ({ match, matchValues,checkForValidUser }) => {
  const scoreGoal = () => {
    console.log('EEHEHHE')
    socket.emit("goalScoreAdmin", {
      token: localStorage.getItem("token"),
      match: matchValues
    });
  };
  const matchLive = live => {
    console.log('EEHEHHE')
    
    socket.emit("matchGoLive", {
      token: localStorage.getItem("token"),
      match: matchValues,
      liveValue: live
    });
  };
  const matchFinished = finished => {
    console.log('EEHEHHE')
    socket.emit("matchGoFinished", {
      token: localStorage.getItem("token"),
      match: matchValues,
      finishedValue: finished
    });
  };
  useEffect(() => {
  
      checkForValidUser()
  }, []);
  return (
    <Container maxWidth="sm">
      <form >
      <FirstRowInfo match={match} scoreGoalSocket={scoreGoal} />
      <MatchInfo match={match} matchSocketLive={matchLive} matchFinished={matchFinished} />
      <ActionsCreate match={match} />
      </form>
    </Container>
  );
};
EditingMatch = reduxForm({
  form: "editingMatch",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true
})(EditingMatch);

const selector = formValueSelector("editingMatch");
EditingMatch = connect(state => ({
  matchID: state.ui.editingMatch.id,
  initialValues: find(
    propEq("id", state.ui.editingMatch.id),
    state.matches.matches
  ),
  matchValues: {
    scoreHome: selector(state, "scoreHome"),
    scoreHost: selector(state, "scoreHost"),
    id: selector(state, "id")
  },
  
  match: find(propEq("id", state.ui.editingMatch.id), state.matches.matches)
}),{checkForValidUser})(EditingMatch);

export default EditingMatch;
