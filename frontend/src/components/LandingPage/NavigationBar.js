import React, { useState } from "react";
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
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { Menu, MenuItem, Button, Avatar } from "@material-ui/core";
import { logout } from "../../actions/login";
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

const NavigationBar = ({ history, user, width, logout }) => {
  const { isAuthenticated } = user;
  const [notif, setNotif] = useState(
    JSON.parse(localStorage.getItem("LIVE_NOTIFIC"))
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifSound, setNotifSound] = useState(
    JSON.parse(localStorage.getItem("LIVE_NOTIFIC_SOUND"))
  );
  const classes = useStyles();
  const mobile = isWidthDown("md", width);
  const onClose = () => {
    setAnchorEl(null);
  };

  const notificationIconSound = (white) => (<Tooltip
    title="Vypnout notifikace"
    onClick={e => {
      const value = notifSound;
      if (value) {
        localStorage.setItem(
          "LIVE_NOTIFIC_SOUND",
          JSON.stringify(false)
        );
        setNotifSound(false);
      } else {
        localStorage.setItem("LIVE_NOTIFIC_SOUND", true);
        setNotifSound(true);
      }
    }}
  >
    <IconButton aria-label="delete" style={white ? { color: "white" } : { color: "black" }}>
      {notifSound ? (
        <VolumeUpIcon fontSize={"large"} />
      ) : (
        <VolumeOffIcon fontSize={"large"} />
      )}
    </IconButton>
  </Tooltip>)
  const notificationIcon = (white) => (<IconButton
    aria-label="delete"
    style={white ? { color: "white" } : { color: "black" }}
    onClick={e => {
      const value = notif;
      if (value) {
        localStorage.setItem(
          "LIVE_NOTIFIC",
          JSON.stringify(false)
        );
        localStorage.setItem(
          "LIVE_NOTIFIC_SOUND",
          JSON.stringify(false)
        );
        setNotifSound(false);
        setNotif(false);
      } else {
        localStorage.setItem("LIVE_NOTIFIC", true);
        setNotif(true);
      }
    }}
  >
    {notif ? (
      <NotificationsActiveOutlinedIcon fontSize={"large"} />
    ) : (
      <NotificationsOffIcon fontSize={"large"} />
    )}
  </IconButton>)
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <Typography variant="h6" style={mobile ? {fontSize: '0.9rem'} : {}} className={classes.title}>
              Onlajny - OLLH
            </Typography>
          </Link>
          <Link to="/chatRoom" style={{ marginLeft: "20px" }}>
            <Typography variant="h6" className={classes.title} style={mobile ? {fontSize: '0.9rem'} : {}}>
              Diskuze
            </Typography>
          </Link>
          {user.role === "Admin" ? (
            <Typography
              onClick={() => history.push("/admin")}
              variant="h6"
              
              className={classes.title}
              style={mobile ? {fontSize: '0.9rem', cursor: "pointer", marginLeft: "20px"} : { cursor: "pointer", marginLeft: "20px" }}
            >
              Admin
            </Typography>
          ) : (
            <Typography
              className={classes.title}
              style={{ marginLeft: "20px" }}
            >
              {"\u00A0"}
              {"\u00A0"}
              {"\u00A0"}
              {"\u00A0"}
              {"\u00A0"}
              {"\u00A0"}
            </Typography>
          )}

          {!mobile ? (
            <React.Fragment>
              {notificationIconSound(true)}
              {notificationIcon(true)}
              {isAuthenticated ? (
                <UserInfo user={user} />
              ) : (
                <LoginRegisterButtons history={history} />
              )}
            </React.Fragment>
          ) : (
            <MoreVertIcon onClick={e => setAnchorEl(e.currentTarget)} />
          )}
          {
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={e => setAnchorEl(null)}
            >
               <MenuItem>
                  {notificationIcon(false)}{notificationIconSound(false)}
                  </MenuItem>
              {isAuthenticated ? (
                <React.Fragment>
                  <MenuItem>
                    <Avatar
                      alt="Cindy Baker"
                      className={classes.white}
                      src="https://thumbs.dreamstime.com/z/avatar-man-shirt-avatar-face-single-icon-cartoon-style-vector-symbol-stock-illustration-web-90353034.jpg"
                    />
                    {user.username}
                  </MenuItem>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <MenuItem>
                    <Button
                      onClick={() => {
                        history.push("/login");
                        onClose();
                      }}
                    >
                      Přihlásit se
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => {
                        history.push("/registration");
                        onClose();
                      }}
                    >
                      Registrovat
                    </Button>{" "}
                  </MenuItem>
                 
                </React.Fragment>
              )}

              {isAuthenticated && (
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
              )}
            </Menu>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(
  state => ({
    user: state.user
  }),
  { logout }
)(withRouter(withWidth()(NavigationBar)));
