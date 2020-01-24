import Snackbar from "@material-ui/core/Snackbar";
import { ToastContainer } from "react-toastify";
import React from "react";
import { Grid, Avatar, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    '@keyframes blinker': {
        from: {opacity: 1},
        to: {opacity: 0}
    },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  blinkingText: {
    animationName: '$blinker',
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount:'infinite',
  },
  textColorBlack: {
    color: "black"
  }
}));
const MatchGoalNotification = ({
  closeToast,
  matchId,
  match: { teamHome, teamHost, scoreHome, scoreHost }
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid
        item
        direction="row"
        justify="center"
        alignItems="center"
        style={{ textAlign: "center" }}
        xs={12}
      >
        <Typography variant={"h5"} color={"secondary"} className={classes.blinkingText}>
          GÓL
        </Typography>
      </Grid>
      <Grid item xs={3} sm={3}>
        <Avatar alt={"Icon"} src={teamHome.img} className={classes.large} />
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        xs={6}
        sm={6}
      >
        <Typography variant={"h3"} className={classes.textColorBlack}>
          {scoreHome}
        </Typography>
        <Typography variant={"h4"} className={classes.textColorBlack}>
          :
        </Typography>
        <Typography variant={"h3"} className={classes.textColorBlack}>
          {scoreHost}
        </Typography>
      </Grid>
      <Grid item xs={3} sm={3}>
        <Avatar alt={"Icon"} src={teamHost.img} className={classes.large} />
      </Grid>
    </Grid>
  );
};

export default MatchGoalNotification;
