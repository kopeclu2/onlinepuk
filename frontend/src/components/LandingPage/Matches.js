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
    const { matches, matchesFinished, finished, matchesScheduled,pageNumbersScheduled } = this.props;
    return (
      <div >
        {matches ? (
          finished ? (
            matchesFinished && 
            matchesFinished.map((match, index) => (
              <Link to={`/match/${match.id}`} key={index}>
                <Match match={match} />
              </Link>
            ))
          ) : (
            matchesScheduled &&  
            matchesScheduled.map((match, index) =>
                <Link to={`/match/${match.id}`}  key={index}>
                  <Match match={match} />
                </Link>
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
export default connect(
  state => {
    const postsPerPage = 4;
    const currentPage = state.ui.paginationCurrentPageFinished + 1;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const matchesFin = state.matches.finishedMatches.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const postsPerPageScheduled = 3 ;
    const currentPageScheduled = state.ui.paginationCurrentPageScheduled + 1;
    const indexOfLastPostScheduled = currentPageScheduled * postsPerPageScheduled;
    const indexOfFirstPostScheduled = indexOfLastPostScheduled - postsPerPageScheduled;
    const matchesScheduledAll = state.matches.matches.filter((match,index) => match.finished === 0 && match.live === 0 )
    const matchesScheduled = matchesScheduledAll.slice(indexOfFirstPostScheduled,indexOfLastPostScheduled)
    return {
      matchesScheduled,
      matches: state.matches.matches,
      matchesFinished: matchesFin,
      loading: state.matches.matchesLoading
    };
  },
  { loadMatches }
)(Matches);
