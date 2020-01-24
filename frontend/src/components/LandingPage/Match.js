import React from "react";
import {
  Card,
  makeStyles,
  Grid,
  Paper,
  Avatar,
  Typography
} from "@material-ui/core";
import moment from "moment";
import "moment/locale/cs";
const useStyles = makeStyles(theme => ({
  teamsText: {
    color: theme.palette.text.secondary,
    textAlign: "center"
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  }
}));

const Match = ({ match }) => {
  const classes = {
    display: "flex",
    justifyContent: "center"
  };
  const materialClasses = useStyles();
  let time = moment(match.date).format('llll');
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
          <Grid item xs style={classes}>
            <Typography variant={"h2"}>{match.scoreHome}</Typography>
            <Typography variant={"h2"}>:</Typography>
            <Typography variant={"h2"}>{match.scoreHost}</Typography>
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
            variant={"h7"}
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
