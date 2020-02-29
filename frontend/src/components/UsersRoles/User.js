import React, {useState, useEffect} from 'react';
import {TableCell, Select,Avatar, MenuItem,IconButton, TableRow}from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import roles from '../../utils/roles';
import {deleteUser} from '../../actions/Admin/deleteUser'
import {connect} from 'react-redux'
import { setRoleToUser } from '../../actions/Admin/setRoleToUser';
const User = ({user,deleteUser,setRoleToUser}) => {
    
    const [role, setRole] = useState(user.role)
    useEffect(()=> {
        setRole(user.role)
    }, [user])
    return (  <TableRow>
        <TableCell component="th" scope="row">
          {" "}
          <Avatar
            alt="Remy Sharp"
            src="https://source.unsplash.com/random"
          />
        </TableCell>

        <TableCell align="left">{user.username}</TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="left">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value={roles.user}>User</MenuItem>
            <MenuItem value={roles.admin}>Admin</MenuItem>
          </Select>
        </TableCell>
        <TableCell align="center">
           <IconButton>
           {role !== user.role && <SaveIcon onClick={()=>{
             setRoleToUser(user._id, role)
           }}color="primary" />}
          </IconButton> 
          
          <IconButton onClick={()=> deleteUser(user._id)}>
            <DeleteIcon color="secondary" />
          </IconButton>
        </TableCell>
      </TableRow> );
}
 
export default connect(()=>({}),{
    deleteUser,
    setRoleToUser
})(User);