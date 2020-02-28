import React, {useEffect,useState} from "react";
import PropTypes from "prop-types";
import {
  createMuiTheme,
  ThemeProvider,
  withStyles
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Navigator from "./Navigator";
import Content from "./Content";
import Header from "./Header";
import {push} from 'connected-react-router'
import {connect} from 'react-redux'
import { Route, Redirect } from "react-router-dom";
import {toast} from 'react-toastify'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

let theme = createMuiTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3"
    }
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    }
  },
  shape: {
    borderRadius: 8
  },
  props: {
    MuiTab: {
      disableRipple: true
    }
  },
  mixins: {
    toolbar: {
      minHeight: 48
    }
  }
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c"
      }
    },
    MuiButton: {
      label: {
        textTransform: "none"
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none"
        }
      }
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1)
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white
      }
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0,
          minWidth: 0
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1)
      }
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854"
      }
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20
        }
      }
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32
      }
    }
  }
};

const drawerWidth = 256;

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 0),
    },
    background: "#eaeff1"
  },
  footer: {
    padding: theme.spacing(2),
    background: "#eaeff1"
  }
};

function Paperbase(props) {
  const { classes, push } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [redirect,setRedirect] = useState(false)
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    fetch(`http://localhost:4000/users/check`, {
        method: "POST",
        body: JSON.stringify({ token: localStorage.getItem("token") }),

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status === 200) {
            setLoading(false)
            return res.json();
          } else {
            throw new Error();
          }
        })
        .catch((err) => { if(err.text){console.log(err.text()); toast.warn('Něco se nezdařilo'); setRedirect(true)}});
  },[])

  if (redirect) return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
  if(loading){
    return null
  }else {
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
  
          <div className={classes.app}>
            <main className={classes.main}>
              <Content />
            </main>
            <footer className={classes.footer}>
              <Copyright />
            </footer>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(()=>({}),{push})(withStyles(styles)(Paperbase));
