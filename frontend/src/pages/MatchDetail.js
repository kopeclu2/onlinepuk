import { connect } from "react-redux";
import React, { Component, useEffect } from "react";
import { getMatchById, loadMatches } from "../actions/matches";
import moment from "moment";
import {
  Container,
  Grid,
  Card,
  Avatar,
  Typography,
  makeStyles,
  CircularProgress,
  Paper,
  withWidth,
  useMediaQuery
} from "@material-ui/core";
import { isNil, isEmpty } from "ramda";
import MatchActionHome from "../components/Match/MatchActionHome";
import MatchActionHost from "../components/Match/MatchActionHost";

const useStyles = makeStyles(theme => ({
  teamsText: {
    color: theme.palette.text.secondary,
    textAlign: "center"
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
}));

const MatchDetail = ({ match, matchDetail, matches, width }) => {
  useEffect(() => {
    const id = match.params.id;
  }, []);
  const min600 = useMediaQuery("(max-width:600px)");
  const classes = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  const materialClasses = useStyles();
  const matchNew = !isEmpty(matches)
    ? matches.find(obj => obj.id === Number(match.params.id))
    : {};
  const renderActions = matchDetail => (
    <Grid container spacing={0} direction={"row"} style={{ marginTop: "70px" }}>
      {matchDetail.actions.map(action =>
        action.teamHomeOrHost === 1 ? (
          <MatchActionHome action={action} />
        ) : (
          <MatchActionHost action={action} />
        )
      )}
    </Grid>
  );
  const renderMatchInfo = matchDetail => (
    <Card style={{ padding: "10px" }}>
      <Grid container spacing={3}>
        <Grid item xs style={classes}>
          <Avatar
            className={materialClasses.large}
            alt="Remy Sharp"
            src={matchDetail.teamHome.img}
          />
        </Grid>
        <Grid item xs style={classes}>
          <Typography variant={"h2"}>{matchDetail.scoreHome}</Typography>
          <Typography variant={"h2"}>:</Typography>
          <Typography variant={"h2"}>{matchDetail.scoreHost}</Typography>
        </Grid>
        <Grid item xs style={classes}>
          <Avatar
            alt="Remy Sharp"
            className={materialClasses.large}
            src={matchDetail.teamHost.img}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} style={classes}>
        <Grid item xs>
          <Typography variant={"h6"} className={materialClasses.teamsText}>
            {matchDetail.teamHome.nazev}
          </Typography>
        </Grid>
        <Grid item xs={4} style={classes}>
          <Typography variant={"h7"} className={materialClasses.teamsText}>
            {moment(matchDetail.date).format("llll")}
          </Typography>
        </Grid>
        <Grid item xs style={classes}>
          <Typography variant={"h6"} className={materialClasses.teamsText}>
            {matchDetail.teamHost.nazev}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
  const WidthWrapper = ({ children }) => {
    return min600 ? (
      <div style={{ marginRight: "10px", marginLeft: "10px" }}>{children}</div>
    ) : (
      <Container maxWidth={"lg"}>
        <Container maxWidth={"md"}> {children} </Container>
      </Container>
    );
  };
  return !isNil(matchDetail) ? (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <WidthWrapper>
        {renderMatchInfo(matchDetail)}
        {renderActions(matchDetail)}
      </WidthWrapper>
    </div>
  ) : (
    <CircularProgress />
  );
};
export default connect(
  (state, ownProps) => {
    return {
      matchesLoaded: state.matches.matchesLoaded,
      matchDetail: !isEmpty(state.matches.matches)
        ? state.matches.matches.find(
            obj => obj.id === Number(ownProps.match.params.id)
          )
        : null,
      matches: state.matches.matches
    };
  },
  { getMatchById, loadMatches }
)(withWidth()(MatchDetail));
