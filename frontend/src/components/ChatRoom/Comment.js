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
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
const socket = openSocket.connect(
  process.env.NODE_ENV === "production"
    ? "https://onlinepuk.herokuapp.com/"
    : "/"
);

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
  setAnswerSubState,
  setAnswerSub,
  response,
  width,
  setfromAnswerChange
}) => {
  const [Value, setValue] = useState("");
  const [Edit, setEdit] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [isAnswerSubOpen, setisAnswerSubOpen] = useState(false);
  const [fromAnswer, setfromAnswer] = useState(false);
  const [numberOfSubcomments, setnumberOfSubcomments] = useState(2);
  const mobile = isWidthDown("xs", width);
  const classes = useStyles();
  const deleteCommentWS = () => {
    socket.emit("deleteComment", {
      token: localStorage.getItem("token"),
      _id: comment._id,
      user: user.sub
    });
  };
  console.log(comment.subComments.length, numberOfSubcomments);

  const createSubCommentWS = (parrentID, content) => {
    socket.emit("createSubComment", {
      token: localStorage.getItem("token"),
      parrentID: comment._id,
      user: user.sub,
      content: content
    });
  };
  const updateSubCommentWS = (content, _id) => {
    socket.emit("updateSubComment", {
      token: localStorage.getItem("token"),
      _id: _id,
      content: content
    });
  };
  if (isNil(comment.postedBy)) {
    return "";
  }
  const commentOwner = user.sub === comment.postedBy._id;
  const fromAnswerChange = value => {
    if (value) {
      setfromAnswer(true);
      setAnswer(value);
    } else {
      setAnswer(value);
    }
  };
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
        <ListItem
          alignItems="flex-start"
          className={classes.root}
          style={{ padding: "1px 0px 1px 5px" }}
        >
          <Grid container justify={"flex-start"} alignItems={"center"}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              md={1}
              xs={2}
            >
              <ListItemAvatar style={{ padding: "0", margin: "0" }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://picsum.photos/200"
                  style={mobile ? { height: "30px", width: "30px" } : {}}
                />
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
                  style={{ margin: "0px 0px 0px -15px" }}
                  primary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="h6"
                        className={classes.inline}
                        style={{
                          color: "rgb(18, 101, 189)",
                          fontSize: mobile ? "0.7rem" : "0.9rem"
                        }}
                      >
                        {comment.postedBy.username}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                        style={{
                          marginLeft: "8px",
                          fontSize: mobile ? "0.6rem" : "0.7rem"
                        }}
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
                        style={{ fontSize: mobile ? "0.7rem" : "0.8rem" }}
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
                {
                  <Link
                    component="button"
                    variant="body2"
                    style={{ fontSize: mobile ? "0.7rem" : "0.8rem" }}
                    onClick={() => {
                      if (subComment) {
                        setAnswerSub(!setAnswerSubState);
                        setisAnswerSubOpen(!isAnswerSubOpen);
                      } else {
                        setAnswer(!answer);
                        setfromAnswer(false);
                      }
                    }}
                  >
                    {subComment
                      ? isAnswerSubOpen
                        ? "Zavřít"
                        : "Odpovědět"
                      : fromAnswer
                      ? "Odpovědět"
                      : answer
                      ? "Zavřít"
                      : "Odpovědět"}
                  </Link>
                }
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
      <div>
      {!comment.isSubComment &&
        comment.subComments.map((subComment, index) => {
          return index < numberOfSubcomments ? ( 
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
                setAnswerSubState={answer}
                setAnswerSub={fromAnswerChange}
                setfromAnswerChange={setfromAnswer}
              />{" "}
             
            </div>
          ) : (
            index === numberOfSubcomments ? (
              <div
                style={{ marginBottom: "2px", marginTop: "2px", clear: "both" }}
              >
                <Paper
                  style={
                    subComment && {
                      float: "right",
                      width: "90%",
                      marginTop: "2px",
                      marginBottom: "2px",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      boxShadow: "none"
                    }
                  }
                >
                  <Link
                    component="button"
                    variant="body2"
                    style={{ fontSize: mobile ? "0.7rem" : "0.8rem" }}
                    onClick={() => setnumberOfSubcomments(numberOfSubcomments + 2)}
                  >
                    Nacist dalsi
                  </Link>
                </Paper>
              </div>
            ) : ('')
          );
        })
        
      }
     
      </div>
      
    </div>
  );
};

export default withWidth()(Comment);
/*<Comment subComment />*/
/*
{
        comment.subComments.length <= numberOfSubcomments && <div
        style={{ marginBottom: "2px", marginTop: "2px", clear: "both" }}
      >
        <Paper
          style={
            subComment && {
              float: "right",
              width: "90%",
              marginTop: "2px",
              marginBottom: "2px",
              textAlign: "center",
              backgroundColor: "transparent",
              boxShadow: "none"
            }
          }
        >
          <Link
            component="button"
            variant="body2"
            style={{ fontSize: mobile ? "0.7rem" : "0.8rem" }}
            onClick={() => setnumberOfSubcomments(numberOfSubcomments + 2)}
          >
            Skryt
          </Link>
        </Paper>
      </div>
      }*/