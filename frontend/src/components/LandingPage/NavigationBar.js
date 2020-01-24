import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Link as MatLink } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UserInfo from '../Naviagtion/UserInfo'
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import LoginRegisterButtons from '../Naviagtion/LoginRegisterButtons';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: "#1976d2"
    }
}));

const NavigationBar = ({history, user}) => {
    const { isAuthenticated } = user;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary" className={classes.appBar}>
                <Toolbar>
                    <Link to='/'>
                            <Typography  variant="h6" className={classes.title}>
                                HC Čestice - Onlajny
                            </Typography>
                    </Link>
                    
                     { user.role === 'Admin' ? <Typography onClick={() => history.push('/admin')} variant="h6" className={classes.title}>
                        Admin
                     </Typography> : null}
                     { isAuthenticated ? <UserInfo user={user}/> : <LoginRegisterButtons history={history} /> }
                </Toolbar>
            </AppBar>
        </div>);
}

export default connect((state) => ({
    user: state.user
}))(withRouter(NavigationBar));