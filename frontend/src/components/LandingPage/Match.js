import React from "react";
import {
  Card,
  makeStyles,
  Grid,
  Avatar,
  Typography
} from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import moment from "moment";
import "moment/locale/cs";
import { useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  '@keyframes blinker': {
    from: {opacity: 1},
    to: {opacity: 0}
},
  teamsText: {
    color: theme.palette.text.secondary,
    textAlign: "center"
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
    color:'red'
  },
}));

const Match = ({ match }) => {
  const classes = {
    display: "flex",
    justifyContent: "center"
  };
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('sm'));
  const materialClasses = useStyles();
  let time = moment(match.date).format("llll");
  return (
    <Card style={{ padding: "10px", marginTop: "5px" }}>
      <Grid container spacing={3}>
        <Grid item xs style={classes}>
          <Avatar
            className={materialClasses.large}
            alt="Remy Sharp"
            src={match.teamHome.img}
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
              <Typography variant={"h2"}>{match.live === 0 && match.finished === 0 ? <div style={{marginRight: "15px"}}>{xs  ?'-'  : '—' }</div> :match.scoreHome}</Typography>
              <Typography variant={"h2"}>:</Typography>
              <Typography variant={"h2"}>{match.live === 0 && match.finished === 0 ? <div style={{marginLeft: "15px"}}>{xs  ? '-'  : '—' }</div> :match.scoreHost}</Typography>
            </Grid>
            {match.live === 1 && (
              <Grid item>
                <Typography
                  variant={"h6"}
                  className={materialClasses.blinkingText}
                  style={{ alignItems: "center" }}
                >
                 ● LIVE
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs style={classes}>
          <Avatar
            alt="Remy Sharp"
            className={materialClasses.large}
            src={match.teamHost.img}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} style={classes}>
        <Grid item xs>
          <Typography variant={"h6"} className={materialClasses.teamsText}>
            {match.teamHome.nazev}
          </Typography>
        </Grid>
        <Grid item xs={4} style={classes}>
          <Typography
            variant={"body1"}
            className={materialClasses.teamsText}
            style={{ alignItems: "center" }}
          >
            {time}
          </Typography>
        </Grid>
        <Grid item xs style={classes}>
          <Typography variant={"h6"} className={materialClasses.teamsText}>
            {match.teamHost.nazev}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Match;
/*<Grid container spacing={3} style={classes}>
        <Grid item xs>
        </Grid>
        <Grid item xs={4} style={classes}>
          <Typography
            variant={"h6"}
            color={'secondary'}
            className={materialClasses.teamsText}
            style={{ alignItems: "center" }}
          >
            LIVE
          </Typography>
        </Grid>
        <Grid item xs style={classes}>
        </Grid>
      </Grid>*/
