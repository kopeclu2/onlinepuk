import React, { Component } from "react";
import { connect } from "react-redux";
import { loadMatches } from "../../actions/matches";
import { Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Match from "./Match";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

class Matches extends Component {
  componentDidMount() {
    this.props.loadMatches();
  }
  render() {
    const { matches, matchesFinished, finished } = this.props;
    console.log("MATCH", matches);
    return (
      <div >
        {matches ? (
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
              index === 0 ? null : (match.finished === 0 && match.live === 0) ? (
                <Link to={`/match/${match.id}`}>
                  <Match match={match} />
                </Link>
              ) : null
            )
          )
        ) : (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <CircularProgress />
          </Grid>
        )}
      </div>
    );
  }
}
const pagination = () => {};
export default connect(
  state => {
    const postsPerPage = 4;
    const currentPage = state.ui.paginationCurrentPageFinished + 1;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const matchesPag = state.matches.matches.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const matchesFin = state.matches.finishedMatches.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    return {
      matches: state.matches.matches,
      matchesFinished: matchesFin,
      loading: state.matches.matchesLoading
    };
  },
  { loadMatches }
)(Matches);
