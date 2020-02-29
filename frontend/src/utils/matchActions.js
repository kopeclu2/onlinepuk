import React from "react";
import SportsIcon from "@material-ui/icons/Sports";
import { Typography } from "@material-ui/core";
export const goalActions = [
  {
    desc: <i class="fas fa-hockey-puck"></i>
  }
];

export const periodActions = [
  { id: 0, desc: "1.Třetina" },
  { id: 1, desc: "2.Třetina" },
  { id: 2, desc: "3.Třetina" },
  { id: 4, desc: "Prodloužení" },
  { id: 5, desc: "Nájezdy" },
  { id: 6, desc: "Konec" }
];

export const otherSymbols = [
  {
    desc: <SportsIcon />
  },
  {
    desc: <i class="fas fa-info-circle" style={{ color: "deepskyblue" }}></i>
  },
  {
    desc: <i class="fas fa-plus-square" style={{ color: "red" }}></i>
  },
  {
    desc: (
      <div>
        <i class="fas fa-arrow-up" style={{ color: "green" }}></i>
        <i class="fas fa-arrow-down" style={{ color: "red" }}></i>
      </div>
    )
  }
];

const matchActions = [
  {
    id: 0,
    desc: (
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
    )
  },

  {
    id: 1,
    desc: (
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
    )
  },
  {
    id: 2,
    desc: (
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
    )
  },
  {
    id: 3,
    desc: (
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
    )
  },
  {
    id: 4,
    desc: (
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
    )
  },
  {
    id: 5,
    desc: (
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
    )
  },
  {
    id: 6,
    desc: (
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
    )
  },
  {
    id: 7,
    desc: (
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
    )
  },
  {
    id: 8,
    desc: (
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
    )
  },
  {
    id: 9,
    desc: (
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
    )
  },
  {
    id: 10,
    desc: (
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
    )
  },
  {
    id: 11,
    desc: (
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
    )
  }
];

export default matchActions;
