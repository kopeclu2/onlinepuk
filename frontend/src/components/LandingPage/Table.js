import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { Avatar, Grid, Typography, useStyles } from '@material-ui/core';

const useStylesMaterial = makeStyles(theme => ({
  teamsText: {
      color: theme.palette.text.secondary,
      textAlign: 'center'
  },
  large: {
      width: theme.spacing(4),
      height: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  }
}));


function SimpleTable({ teams }) {
  const classes = useStylesMaterial();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tým</TableCell>
            <TableCell align="right">Zapasy</TableCell>
            <TableCell align="right">Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map(team => (
            <TableRow key={team.nazev}>
              <TableCell component="th" scope="row">
                <Grid container direction='row' style={{
                  display: "flex",
                  justifyContent: "center"
                }} >
                  <Grid item xs={2}>
                    <Avatar alt="Remy Sharp" src={team.img} className={classes.large} />
                  </Grid>
                  <Grid item xs={10}>
                  <Typography variant={'h6'} className={classes.teamsText}>{team.nazev}</Typography>
                  </Grid>
                  
                </Grid>
              </TableCell>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell component="th" scope="row"></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default connect((state) => ({ teams: state.teams.allTeams }))(SimpleTable)