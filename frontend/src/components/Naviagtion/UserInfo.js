import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Avatar } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {logout} from '../../actions/login'
import {connect} from 'react-redux'
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    white: {
        backgroundColor: "white"
    },
    name: {
        marginLeft: "6px"
    }
}));

const UserInfo = ({ user, logout }) => {
    const {user_img, username} = user;
    const classes = useStyles();
    return (
        <React.Fragment>
            {user_img ?
                <Avatar alt="Cindy Baker" className={classes.white} src={user_img} />
                :
                <Avatar alt="Cindy Baker"
                className={classes.white}
                    src="https://thumbs.dreamstime.com/z/avatar-man-shirt-avatar-face-single-icon-cartoon-style-vector-symbol-stock-illustration-web-90353034.jpg" />
            }
        <Typography variant="h5" className={classes.name} >
            {username}
        </Typography>
        <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={()=> logout()}>
            <ExitToAppIcon />
         </IconButton>
        </React.Fragment>);
}

export default connect(()=>{},{logout})(UserInfo);