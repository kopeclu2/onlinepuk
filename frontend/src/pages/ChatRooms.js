import React, { useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  List,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress
} from "@material-ui/core";
import Skeleton from 'react-loading-skeleton';
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Comment from "../components/ChatRoom/Comment";
import loadComments from "../actions/loadComments";
import deleteComment from "../actions/deleteComment"
import { isEmpty } from "ramda";
import { change } from "redux-form";
import { createComment } from "../actions/createComment";
import openSocket from "socket.io-client";

const socket = openSocket.connect(
  process.env.NODE_ENV === "production"
    ? window.location.origin === "http://localhost:4000"
      ? "/"
      : "https://onlinepuk.herokuapp.com/"
    : "/"
);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  inline: {
    display: "inline"
  }
}));
const ChatRoom = ({
  loadComments,
  comments,
  createComment,
  loading,
  deleteComment,
  user
}) => {
  const [text, changeText] = useState("");
  const [id, changeId] = useState(null);
  const classes = useStyles();
 
  const loadCommentToEdit = (id,value) => {
    changeText(value);
    changeId(id)
  }
  const createCommentWS = () => {
    socket.emit("createComment", {
      token: localStorage.getItem("token"),
      content: text,
      user: user.sub
    });
  };
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper style={{ padding: "10px" }}>
        <Grid container justify={"center"} alignItems={"center"}>
          {user.isAuthenticated ? (
            <React.Fragment>
              <Grid item md={10}>
                <TextField
                  value={text}
                  onChange={e => changeText(e.target.value)}
                  label={"Váš komentář"}
                  variant={"outlined"}
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
                  style={{ padding: "14.5px 14px" }}
                  onClick={e => {
                    createCommentWS();
                    changeText('')
                  }}
                >
                  Odeslat
                </Button>
              </Grid>
            </React.Fragment>
          ) : (
            "Prosim prihlste se pro pridani komentare"
          )}
        </Grid>
      </Paper>
      {loading ? (
        <Grid container justify={"center"} alignItems={"center"}>
          {" "}
          <Skeleton count={5} height={100} />{" "}
        </Grid>
      ) : (
        <List className={classes.root} style={{ marginTop: "20px" }}>
          {!isEmpty(comments) &&
            comments.map(comment => <Comment user={user} edit={loadCommentToEdit} deleteComment={deleteComment}  comment={comment} />)}
        </List>
        
      )}

    </Container>
  );
};

export default connect(
  state => ({
    comments: state.discusion.comments,
    loading: state.discusion.loading,
    user: state.user
  }),
  {
    loadComments,
    createComment,
    deleteComment
  }
)(ChatRoom);
