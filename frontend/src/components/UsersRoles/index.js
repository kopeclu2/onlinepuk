import {
  Grid,
  CircularProgress,
  Paper,
  Typography,
  Avatar,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  TableHead,
  makeStyles,
  IconButton,
  Select,
  MenuItem
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import { useEffect } from "react";
import { loadUsers } from "../../actions/Admin/loadUsers";
import { connect } from "react-redux";
import { isEmpty } from "ramda";
import User from "./User";
import { checkForValidUser } from "../../actions/checkForValidUser";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const UsersRole = ({ loadUsers, allUsers =[], loading,checkForValidUser }) => {
  const classes = useStyles();
  const [role, setRole] = useState(1);
  useEffect(() => {
    loadUsers();
  
      checkForValidUser()

  }, []);
  console.log(allUsers, isEmpty(allUsers));
  const mapUsers = (allusers) => {
    console.log('small', allusers)
   return allusers.map(user => <User user={user} />)
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="center">Akce</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { !isEmpty(allUsers) && mapUsers(allUsers) }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default connect(
  state => ({
    allUsers: state.allUsers.users,
    loading: state.allUsers.loading
  }),
  {
    loadUsers,
    checkForValidUser
  }
)(UsersRole);
