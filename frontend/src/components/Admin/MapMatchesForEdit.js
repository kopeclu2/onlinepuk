import React from "react";
import { Grid, MenuItem, Divider, IconButton, Avatar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
const MapMatchesForEdit = ({
  matches,
  editingMatchOpen,
  deleteMatch,
  classes
}) =>
  matches.map(
    ({ teamHome, teamHost, scoreHome, scoreHost, id, date, live, finished }) => (
      <div>
        <MenuItem >
          <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
            <Grid item xs={0} sm={2} className={classes.noVisible}>
              {teamHome.nazev}
            </Grid>
            <Grid item xs={2} sm={1}>
              <Avatar src={teamHome.img} />
            </Grid>
            <Grid item xs={2} sm={1}>
              {scoreHome}:{scoreHost}
            </Grid>
            <Grid item xs={2} sm={1}>
              <Avatar src={teamHost.img} />
            </Grid>
            <Grid item xs={0} sm={2} className={classes.noVisible}>
              {teamHost.nazev}
            </Grid>
            <Grid item xs={6} sm={2}>
              {moment(date).format("llll")}
            </Grid>
            <Grid item xs={2} sm={1} style={{display:'flex', justifyContent: 'center'}}>
              {live === 1 && (
                <div
                  className={classes.blinkingText}
                  style={{ textAlign: "center" }}
                >
                  ●
                </div>
              )}
              {finished === 1 && (
                <div
                  className={classes.greenDot}
                  style={{ textAlign: "center" }}
                >
                  ●
                </div>
              )}
            </Grid>
            <Grid container xs={5} sm={1} justify={'center'}>
              <IconButton color="primary">
                <EditIcon onClick={() => editingMatchOpen(id)} />
              </IconButton>
            </Grid>
            <Grid  container xs={5} sm={1} justify={'center'}>
              <IconButton
                color="secondary"
                onClick={() =>
                  window.confirm("Opravdu odstranit zápas ? ") &&
                  deleteMatch(id)
                }
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </MenuItem>
        <Divider />
      </div>
    )
  );
export default MapMatchesForEdit;
