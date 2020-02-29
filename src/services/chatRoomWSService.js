import { ChatRoomComment } from "../models/ChatRoomComment";
import config from "../config.json";
import jwt from "jsonwebtoken";
import { isNil } from "ramda";

export const chatWebSocket = socket => {
  socket.on("createComment", ({ token, user, content }) => {
    console.log({ token, user, content, socket });
    verifyTokenUSer(token, (err, decoded) => {
      if (!err) {
        const comment = new ChatRoomComment({
          content: content,
          postedBy: [user],
          date: new Date(),
          isSubComment: false,
          subComments: []
        });
        comment.save((err, comment) => {
          if (!err) {
            getAllComments(docs => {
              socket.broadcast.emit("ALL_COMMENTS", docs);
            });
          }
        });
      }
    });
  });
  socket.on("deleteComment", ({ token, user, _id }) => {
    ChatRoomComment.findOne({ _id: _id }, (err1, one) => {
      if (err1 || isNil(one)) {
        console.log("error");
      } else {
        verifyTokenUSer(token, (err2, decoded) => {
          console.log("DECODED", decoded);
          console.log("POSTED BY", one.postedBy.toString());
          if (one.postedBy.toString() === decoded.sub) {
            ChatRoomComment.findOneAndDelete({ _id: _id }, (err3, s) => {
              if (!err3) {
                getAllComments(docs => {
                  socket.broadcast.emit("ALL_COMMENTS", docs);
                });
              }
            });
          } else {
            console.log("ERR", err2);
          }
        });
      }
    });
  });
  socket.on("createSubComment", ({ token, parrentID, content, user }) => {
    const parentComment = parrentID;
    verifyTokenUSer(token, (err2, decoded) => {
      if (decoded) {
        const comment = new ChatRoomComment({
          content: content,
          postedBy: [user],
          date: new Date(),
          isSubComment: true
        });
        comment.save();
        ChatRoomComment.findOne({ _id: parentComment }, (err, oldComment) => {
          oldComment.subComments.push(comment);
          oldComment.save((err, comment) => {
            if (!err) {
              getAllComments(docs => {
                socket.broadcast.emit("ALL_COMMENTS", docs);
              });
            }
          });
        });
      }
    });
  });
  socket.on("updateSubComment", ({ token, _id, content }) => {
    console.log({token,_id,content})
    ChatRoomComment.findOne({ _id: _id }, (err1, one) => {
      if (err1) {
        console.log("ERR1", err1);
      } else {
        verifyTokenUSer(token, (err2, decoded) => {
          if (one.postedBy.toString() === decoded.sub) {
            one.content = content;
            one.save((err, done) => {
              if (!err) {
                getAllComments(docs => {
                  socket.broadcast.emit("ALL_COMMENTS", docs);
                });
              }
            });
          } else {
            console.log("ERRRR");
          }
        });
      }
    });
  });
};
export const getAllComments = callback => {
  ChatRoomComment.find({})
    .populate("subComments")
    .populate("postedBy", "_id username email")
    .populate({
      path: "subComments",
      populate: {
        path: "postedBy",
        select: "_id username email"
      }
    })
    .where("isSubComment")
    .equals(false)
    .sort({ date: -1 })
    .exec()
    .then(docs => callback(docs));
};

export const verifyTokenUSer = (token, callBack) => {
  jwt.verify(token, config.secret, (err2, decoded) => {
    callBack(err2, decoded);
  });
};
