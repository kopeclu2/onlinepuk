import React, { useState } from "react";
import { Paper, Grid, TextField, Button, ListItem , makeStyles} from "@material-ui/core";
import createSubComment from "../../actions/createSubComment";
import {connect} from 'react-redux'
const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    inline: {
      display: "inline"
    }
  }));

const Answer = ({createSubComment, parrentID, setAnswer, createSubCommentWS}) => {
  const [text, settext] = useState("");
  const classes = useStyles();
  console.log(parrentID)
  return (
    <Paper style={{ float: "right", width: "90%", marginBottom: "2px" }}>
      <ListItem alignItems="flex-start" className={classes.root} style={{padding: '5px 0px 5px 10px'}}>
        <Grid container justify={"center"} alignItems={"center"}>
          <Grid item md={10}>
            <TextField
              value={text}
              onChange={e => settext(e.target.value)}
              label={"Váš komentář"}
              variant={"outlined"}
              size={'small'}
              fullWidth
            />
          </Grid>
          <Grid
            item
            md={2}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="outlined"
              size="large"
              color="primary"
              style={{ padding: "6px 14px" }}
              onClick={e => { createSubCommentWS(parrentID, text); setAnswer(false)}}
            >
              Odeslat
            </Button>
          </Grid>
        </Grid>
      </ListItem>
    </Paper>
  );
};

export default connect(()=>({}),{createSubComment})(Answer);
