import React from "react";
import { Typography, Divider } from "@material-ui/core";
import { isEmpty } from "ramda";
import Match from "./Match.js";
import Matches from "./Matches.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { findLiveMatches } from "../../utils/matchesFilters.js";
const ScheduledMatches = ({ matches, liveMatches }) => (
  <div>
    <Divider style={{ marginBottom: "2px" }} />
    <Typography variant={"body1"} align={"center"} color={"textSecondary"}>
      Právě hraný zápas
    </Typography>
    {!isEmpty(liveMatches) ? (
      liveMatches.map(match => (
        <Link to={`/match/${match.id}`}>
          <Match match={match} />
        </Link>
      ))
    ) : (
      <Typography variant={"body1"} align={"center"} color={"textSecondary"}>
        Právě se nehraje žádný zápas
      </Typography>
    )}
    <Divider style={{ marginTop: "15px", marginBottom: "2px" }} />
    <Typography variant={"body1"} align={"center"} color={"textSecondary"}>
      Nadcházející zápasy
    </Typography>
    <Matches />
  </div>
);
export default connect(state => ({
  liveMatches: findLiveMatches(state.matches.matches)
}))(ScheduledMatches);
