import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Link as MatLink } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import UserInfo from "../Naviagtion/UserInfo";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LoginRegisterButtons from "../Naviagtion/LoginRegisterButtons";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActiveOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Tooltip, IconButton, Checkbox } from "@material-ui/core";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "white"
  },
  appBar: {
    backgroundColor: "#1976d2"
  }
}));

const NavigationBar = ({ history, user }) => {
  const { isAuthenticated } = user;
  const [notif, setNotif] = useState(JSON.parse(window.localStorage.getItem("LIVE_NOTIFIC")))
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <Typography variant="h6" className={classes.title}>
              Onlajny - OLLH
            </Typography>
          </Link>
          <Typography variant="h6" className={classes.title}>
            {" "}
          </Typography>
          {user.role === "Admin" ? (
            <Typography
              onClick={() => history.push("/admin")}
              variant="h6"
              className={classes.title}
            >
              Admin
            </Typography>
          ) : null}
          <Tooltip title="Vypnout notifikace" onClick={e => {
                const value = JSON.parse(localStorage.getItem("LIVE_NOTIFIC_SOUND"));
                if (value) {
                  localStorage.setItem("LIVE_NOTIFIC_SOUND", JSON.stringify(false));
                  setNotif(false)
                } else {
                  localStorage.setItem("LIVE_NOTIFIC_SOUND", true);
                  setNotif(true)
                }              
              }}>
            <IconButton
              aria-label="delete"
              style={{ color: "white" }}
              
            >
              { JSON.parse(localStorage.getItem("LIVE_NOTIFIC_SOUND")) ? (
                <VolumeUpIcon fontSize={"large"} />
              ) : (
                <VolumeOffIcon fontSize={"large"} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Vypnout notifikace">
            <IconButton
              aria-label="delete"
              style={{ color: "white" }}
              onClick={e => {
                const value = JSON.parse(localStorage.getItem("LIVE_NOTIFIC"));
                if (value) {
                  localStorage.setItem("LIVE_NOTIFIC", JSON.stringify(false));
                  localStorage.setItem("LIVE_NOTIFIC_SOUND", JSON.stringify(false));
                  setNotif(false)
                } else {
                  localStorage.setItem("LIVE_NOTIFIC", true);
                  setNotif(true)
                }              
              }}
            >
              { JSON.parse(localStorage.getItem("LIVE_NOTIFIC")) ? (
                <NotificationsActiveOutlinedIcon fontSize={"large"} />
              ) : (
                <NotificationsOffIcon fontSize={"large"} />
              )}
            </IconButton>
          </Tooltip>
          {isAuthenticated ? (
            <UserInfo user={user} />
          ) : (
            <LoginRegisterButtons history={history} />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(state => ({
  user: state.user
}))(withRouter(NavigationBar));
