import React, { Component } from "react";
import { connect } from "react-redux";
import { loadMatches } from "../../actions/matches";
import {
  Card,
  makeStyles,
  Grid,
  Paper,
  CircularProgress
} from "@material-ui/core";
import Match from "./Match";
import { Link } from "react-router-dom";

class Matches extends Component {
  componentDidMount() {
    this.props.loadMatches();
  }
  render() {
    const { matches, matchesFinished, loading, finished } = this.props;
    return matches ? (
      finished ? (
        matchesFinished &&
        matchesFinished.map((match, index) => (
          <Link to={`/match/${match.id}`}>
            <Match match={match} />
          </Link>
        ))
      ) : (
        matches &&
        matches.map((match, index) =>
          index === 0 ? null : match.finished === 0 ? (
            <Link to={`/match/${match.id}`}>
              <Match match={match} />
            </Link>
          ) : null
        )
      )
    ) : (
      <Grid container direction="column" justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  }
}
export default connect(
  state => ({
    matches: state.matches.matches,
    matchesFinished: state.matches.finishedMatches,
    loading: state.matches.matchesLoading
  }),
  { loadMatches }
)(Matches);
