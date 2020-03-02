import { connect } from "react-redux";
import React, { Component, useEffect } from "react";
import { getMatchById, loadMatches } from "../actions/matches";
import moment from "moment";
import HockeyRing from "../utils/hockey-pitch.png";
import { useTheme } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import {
  Container,
  Grid,
  Card,
  Avatar,
  Typography,
  makeStyles,
  CircularProgress,
  Paper,
  useMediaQuery
} from "@material-ui/core";
import { isNil, isEmpty } from "ramda";
import MatchActionHome from "../components/Match/MatchActionHome";
import MatchActionHost from "../components/Match/MatchActionHost";
import PeriodMatch from "../components/Match/PeriodMatch";
import Loader from "../components/Loader";

const useStyles = makeStyles(theme => ({
  "@keyframes blinker": {
    from: { opacity: 1 },
    to: { opacity: 0 }
  },
  teamsText: {
    color: theme.palette.text.secondary,
    textAlign: "center",
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem'
    }
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    [theme.breakpoints.down('sm')] : {
      width: theme.spacing(6),
    height: theme.spacing(6)
    }
  },
  dateText: {
    color: theme.palette.text.secondary,
    textAlign: "center",
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem'
    }
  },
  blinkingText: {
    animationName: "$blinker",
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    color: "red"
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
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const materialClasses = useStyles();
  const matchNew = !isEmpty(matches)
    ? matches.find(obj => obj.id === Number(match.params.id))
    : {};
  const renderActions = matchDetail => (
    <Grid container spacing={0} direction={"row"} style={{ marginTop: "30px" }}>
      {matchDetail.actions.map(action =>
        action.teamHomeOrHost === 1 ? (
          <MatchActionHome action={action} />
        ) : action.teamHomeOrHost === 2 ? (
          <MatchActionHost action={action} />
        ) : (
          <PeriodMatch action={action} />
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
          <Grid
            container
            style={classes}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid
              container
              alignItems="center"
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Typography variant={isWidthUp('sm',width) ? "h2" :"h4"}>
                {matchDetail.live === 0 && matchDetail.finished === 0 ? (
                  <div style={{ marginRight: "15px" }}>{xs ? "-" : "—"}</div>
                ) : (
                  matchDetail.scoreHome
                )}
              </Typography>
              <Typography variant={isWidthUp('sm',width) ? "h2" :"h4"}>:</Typography>
              <Typography variant={isWidthUp('sm',width) ? "h2" :"h4"}>
                {matchDetail.live === 0 && matchDetail.finished === 0 ? (
                  <div style={{ marginLeft: "15px" }}>{xs ? "-" : "—"}</div>
                ) : (
                  matchDetail.scoreHost
                )}
              </Typography>
            </Grid>
            {matchDetail.live === 1 && (
              <Grid item>
                <Typography
                  variant={"body1"}
                  className={materialClasses.blinkingText}
                  style={{ alignItems: "center", fontSize: "0.8rem" }}
                >
                  ● LIVE
                </Typography>
              </Grid>
            )}
            {matchDetail.finished === 1 && matchDetail.live === 0 && (
              <Grid item>
                <Typography
                  variant={"h6"}
                  style={{ alignItems: "center", fontSize: "0.8rem" }}
                >
                  Dohráno
                </Typography>
              </Grid>
            )}
          </Grid>
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
          <Typography variant={"body1"} className={materialClasses.dateText}>
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
    <div style={{ backgroundColor: "#f5f5f5", paddingBottom: "120px" }}>
      <WidthWrapper>
        {renderMatchInfo(matchDetail)}
        {renderActions(matchDetail)}
      </WidthWrapper>
    </div>
  ) : (
    <Loader />
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
