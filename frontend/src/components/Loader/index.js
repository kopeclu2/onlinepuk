import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { LoopCircleLoading } from "react-loadingg";
import { Typography, Grid } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:'transparent',
    color:'white'
  }
}));

const Loader = ({ open }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <LoopCircleLoading color={"#1976d2"} size={"large"} />
    </Backdrop>
  );
};

export default Loader;
