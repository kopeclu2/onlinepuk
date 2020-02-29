import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { periodActions } from "../../utils/matchActions";

const PeriodMatch = ({ action }) => {
  return (
    <Paper
      style={{
        width: "100%",
        height: "fit-content",
        paddingTop: "2px",
        paddingBottom: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {" "}
      <Typography
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        variant="subtitle1"
        gutterBottom
      >{periodActions[action.type].desc}
      </Typography>
    </Paper>
  );
};

export default PeriodMatch;
