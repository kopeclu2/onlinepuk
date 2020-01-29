import React from "react";
import SportsIcon from "@material-ui/icons/Sports";
import { Typography } from "@material-ui/core";
const matchActions = {
  0: <i class="fas fa-hockey-puck"></i>,
  1: (
    <div
      style={{
        backgroundColor: "#f9c91e",
        padding: "2px",
        borderRadius: "4px"
      }}
    >
      <Typography variant="button" display="block">
        2
      </Typography>
    </div>
  ),
  2: (
    <div
      style={{
        backgroundColor: "#f9c91e",
        padding: "2px",
        borderRadius: "4px"
      }}
    >
      <Typography variant="button" display="block">
        2
      </Typography>
    </div>
  ),
  3: (
    <div
      style={{
        backgroundColor: "#f9c91e",
        padding: "2px",
        borderRadius: "4px"
      }}
    >
      <Typography variant="button" display="block">
        2+2
      </Typography>
    </div>
  ),
  4: (
    <div
      style={{
        backgroundColor: "#f9c91e",
        padding: "2px",
        borderRadius: "4px"
      }}
    >
      <Typography variant="button" display="block">
        5
      </Typography>
    </div>
  ),
  5: (
    <div
      style={{
        backgroundColor: "#f9c91e",
        padding: "2px",
        borderRadius: "4px"
      }}
    >
      <Typography variant="button" display="block">
        10
      </Typography>
    </div>
  ),
  6: (
    <div
      style={{
        backgroundColor: "#f9c91e",
        padding: "2px",
        borderRadius: "4px"
      }}
    >
      <Typography variant="button" display="block">
        2+10
      </Typography>
    </div>
  ),
  7: <SportsIcon />,
  8: <i class="fas fa-info-circle" style={{color: 'deepskyblue'}}></i>,
  9: <i class="fas fa-plus-square" style={{color: 'red'}}></i>,
  10: <div><i class="fas fa-arrow-up" style={{color: 'green'}}></i><i class="fas fa-arrow-down" style={{color: 'red'}}></i></div>,
  11: (
    <div
      style={{
        backgroundColor: "#f9c91e",
        padding: "2px",
        borderRadius: "4px"
      }}
    >
      <Typography variant="button" display="block">
        5+OK
      </Typography>
    </div>
  ),
  12: (
    <div
      style={{
        backgroundColor: "#f9c91e",
        padding: "2px",
        borderRadius: "4px"
      }}
    >
      <Typography variant="button" display="block">
        TH
      </Typography>
    </div>
  ),
  13: (
    <div
      style={{
        backgroundColor: "#f9c91e",
        padding: "2px",
        borderRadius: "4px"
      }}
    >
      <Typography variant="button" display="block">
        OK
      </Typography>
    </div>
  ),
  14: (
    <div
      style={{
        backgroundColor: "#f9c91e",
        padding: "2px",
        borderRadius: "4px"
      }}
    >
      <Typography variant="button" display="block">
        2+OK
      </Typography>
    </div>
  ),
};

export default matchActions;
