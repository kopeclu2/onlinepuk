import React, { useEffect, useState } from "react";
import NavigationBar from "../components/LandingPage/NavigationBar";
import { Container, Grid, Paper, Button } from "@material-ui/core";
import Matches from "../components/LandingPage/Matches";
import { makeStyles } from "@material-ui/core/styles";
import SimpleTable from "../components/LandingPage/Table";
import Match from "../components/LandingPage/Match";
import { isEmpty } from "ramda";
import { Divider, Typography } from "@material-ui/core";
import { loadTeams } from "../actions/teams";
import { loadMatches } from "../actions/matches";
import { connect } from "react-redux";
import { socketConnect } from "socket.io-react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { setCurrentPagePaginationFinished } from "../actions/uiActions.js";
import ScheduledMatches from '../components/LandingPage/ScheduledMatches.js'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const LandingPage = ({
  pageNumbers,
  matches,
  setCurrentPagePaginationFinished
}) => {
  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Container maxWidth={"lg"} style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={5}>
            <Divider style={{ marginBottom: "2px" }} />
            <Typography
              variant={"body1"}
              align={"center"}
              color={"textSecondary"}
            >
              Odehrané zápasy
            </Typography>
            <Matches finished />
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageNumbers}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={({ selected }) =>
                setCurrentPagePaginationFinished(selected)
              }
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            {""}
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <ScheduledMatches matches={matches}/>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default socketConnect(
  connect(
    state => ({
      teams: state.teams.allTeams,
      matches: state.matches.matches,
      pageNumbers: Math.ceil(state.matches.matches.length / 5)
    }),
    { loadTeams, loadMatches, setCurrentPagePaginationFinished }
  )(LandingPage)
);
