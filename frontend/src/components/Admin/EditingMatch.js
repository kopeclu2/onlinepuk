import React from "react";
import { connect } from "react-redux";
import { find, propEq } from "ramda";
import { Container } from "@material-ui/core";
import MatchInfo from "../Admin/EditingMatch/matchInfo";
import { reduxForm, formValueSelector } from "redux-form";
import FirstRowInfo from "./EditingMatch/FirstRowInfo";
import openSocket from "socket.io-client";
import ActionsCreate from "./EditingMatch/ActionsCreate";
import ActionsMap from './EditingMatch/ActionsMap'
const socket = openSocket.connect("http://localhost:4000");

let EditingMatch = ({ match,matchValues }) => {
  const scoreGoal = () => {
    socket.emit('goalScoreAdmin', {token: localStorage.getItem('token'), match: matchValues})
  }
  return (
    <Container maxWidth="sm">
      <FirstRowInfo match={match} scoreGoalSocket={scoreGoal} />
      <MatchInfo match={match} />
      <ActionsCreate match={match} />
     
    </Container>
  );
};
EditingMatch = reduxForm({
  form: "editingMatch"
})(EditingMatch);

const selector = formValueSelector('editingMatch')
EditingMatch = connect(state => ({
  matchID: state.ui.editingMatch.id,
  initialValues: find(
    propEq("id", state.ui.editingMatch.id),
    state.matches.matches
  ),
  matchValues: {
    scoreHome: selector(state,'scoreHome'),
    scoreHost: selector(state,'scoreHost'),
    id: selector(state,'id'),
  },
  match: find(propEq("id", state.ui.editingMatch.id), state.matches.matches),
}))(EditingMatch);

export default EditingMatch;
