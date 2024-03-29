import React, { useState } from "react";
import {
  Avatar,
  Typography,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
  TextField,
  Paper,
  Link,
  IconButton,
  Grid
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core";
import deleteComment from "../../actions/deleteComment";
import { connect } from "react-redux";
import moment from "moment";
import CancelIcon from "@material-ui/icons/Cancel";
import EditSection from "./EditSection";
import Answer from "./Answer";
import openSocket from "socket.io-client";
import { isNil } from "ramda";
const socket = openSocket.connect("http://localhost:4000");

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));
const Comment = ({
  subComment,
  comment,
  user,
  deleteComment,
  edit,
  response
}) => {
  const [Value, setValue] = useState("");
  const [Edit, setEdit] = useState(false);
  const [answer, setAnswer] = useState(false);

  const classes = useStyles();
  const deleteCommentWS = () => {
    socket.emit("deleteComment", {
      token: localStorage.getItem("token"),
      _id: comment._id,
      user: user.sub
    });
  };
  const createSubCommentWS = (parrentID,content) => {
    socket.emit("createSubComment", {
      token: localStorage.getItem("token"),
      parrentID: comment._id,
      user: user.sub,
      content: content
    });
  };
  const updateSubCommentWS = (content,_id) => {
    socket.emit("updateSubComment", {
      token: localStorage.getItem("token"),
      _id: _id,
      content: content
    });
  };
  console.log('COMMENT',comment);
  if( isNil(comment.postedBy)) {
      return '';
  } 
    const commentOwner = user.sub === comment.postedBy._id;
  
  
  
  return (
    <div style={{ marginBottom: "2px", marginTop: "2px", clear: "both" }}>
      <Paper
        style={
          subComment && {
            float: "right",
            width: "90%",
            marginTop: "2px",
            marginBottom: "2px"
          }
        }
      >
        <ListItem alignItems="flex-start" className={classes.root}>
          <Grid container justify={"center"} alignItems={"center"}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              md={1}
            >
              <ListItemAvatar style={{ padding: "0", margin: "0" }}>
                <Avatar alt="Remy Sharp" src="https://picsum.photos/200" />
              </ListItemAvatar>
            </Grid>
            <Grid item md={commentOwner ? 9 : 11}>
              {Edit ? (
                <EditSection
                  commentID={comment._id}
                  setEdit={setEdit}
                  value={Value}
                  setValue={setValue}
                  updateSubCommentWS={updateSubCommentWS}
                />
              ) : (
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="h6"
                        className={classes.inline}
                        style={{ color: "rgb(18, 101, 189)" }}
                      >
                        {comment.postedBy.username}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                        style={{ marginLeft: "25px" }}
                      >
                        {moment(comment.date)
                          .startOf("minute")
                          .fromNow()}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {comment.content}
                      </Typography>
                    </React.Fragment>
                  }
                />
              )}
            </Grid>

            {commentOwner && (
              <Grid item md={2}>
                {Edit ? (
                  <IconButton
                    onClick={() => {
                      setEdit(false);
                      setValue(comment.content);
                    }}
                  >
                    <CancelIcon color="secondary" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      setEdit(true);
                      setValue(comment.content);
                    }}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                )}

                <IconButton onClick={() => deleteCommentWS()}>
                  <DeleteIcon color="secondary" />
                </IconButton>
              </Grid>
            )}
            {user.isAuthenticated && (
              <Grid item md={12}>
                {!subComment && (
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                      setAnswer(true);
                    }}
                  >
                    Odpovědět
                  </Link>
                )}

                <Link
                  style={{ marginLeft: "25px" }}
                  component="button"
                  variant="body2"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                >
                  Like
                </Link>
              </Grid>
            )}
          </Grid>
        </ListItem>
      </Paper>
      {!subComment && answer && (
        <div style={{ marginBottom: "2px", marginTop: "2px" }}>
          <Answer
            parrentID={comment._id}
            answer={answer}
            setAnswer={setAnswer}
            createSubCommentWS={createSubCommentWS}
          />
        </div>
      )}
      {!comment.isSubComment &&
        comment.subComments.map(subComment => {
          return (
            <div style={{ marginBottom: "2px", clear: "both" }}>
              {" "}
              <Comment
                parrentID={comment._id}
                edit={edit}
                subComment
                setValue={setValue}
                comment={subComment}
                deleteComment={deleteComment}
                user={user}
              />{" "}
            </div>
          );
        })}
    </div>
  );
};

export default Comment;
/*<Comment subComment />*/
