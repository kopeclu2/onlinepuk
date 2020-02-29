import { ChatRoomComment } from "../models/ChatRoomComment";
import config from "../config.json";
import jwt from "jsonwebtoken";
import { isEmpty, isNil } from "ramda";
const getAllComments = (req, res) => {
  const comments = ChatRoomComment.find({})
    .populate("subComments")
    .populate("postedBy", "_id username email")
    .populate({
      path:'subComments',
      populate: {
          path: 'postedBy',
          select: "_id username email"
      },      
    })
    .where("isSubComment").equals(false)
    .where("postedBy").ne(null)
    .sort({ date: -1 })
    .exec()
    .then(docs => res.send(docs));
};
const createComment = (req, res) => {
  const comment = new ChatRoomComment({
    content: req.body.content,
    postedBy: [req.body.user],
    date: new Date(),
    isSubComment: false,
    subComments: []
  });
  comment.save((err, comment) => {
    console.log(err);
    if (!err) {
      ChatRoomComment.findOne({ _id: comment._id })
        .populate("postedBy", "_id username email")
        .exec()
        .then(docs => {
          res.status(200).send(docs);
        });
    }
  });
};
const createSubComment = (req, res) => {
  const parentComment = req.body.parrentID;
  console.log(req.body)
  const comment = new ChatRoomComment({
    content: req.body.content,
    postedBy: [req.body.user],
    date: new Date(),
    isSubComment: true
  });
  comment.save()
  ChatRoomComment.findOne({ _id: parentComment }, (err, oldComment) => {
    oldComment.subComments.push(comment);
    oldComment.save((err, comment) => {
      console.log(err, comment);
      if (!err) {
        getAllComments(req, res);
      }
    });
    
  });
};
const updateSubComment = (req,res) => {
  const splitted = req.headers.authorization.split(" ");
  ChatRoomComment.findOne({ _id: req.body._id }, (err1, one) => {
    if (err1 || isNil(one)) {
      res.status(401).send({ message: "Komentar nenalezen" });
    } else {
      jwt.verify(splitted[1], config.secret, (err2, decoded) => {
        if (one.postedBy.toString() === decoded.sub) {
          one.content = req.body.content;
          one.save((err,done) => {
            if(!err) {
              getAllComments(req, res);
            }
          })          
        } else {
          res.status(401).send({ message: "Chyba" });
        }
      })
    }
  })
}
const deleteComment = (req, res) => {
  const splitted = req.headers.authorization.split(" ");

  ChatRoomComment.findOne({ _id: req.body._id }, (err1, one) => {
    if (err1 || isNil(one)) {
      res.status(401).send({ message: "Komentar nenalezen" });
    } else {
      jwt.verify(splitted[1], config.secret, (err2, decoded) => {
        if (one.postedBy.toString() === decoded.sub) {
          ChatRoomComment.findOneAndDelete({ _id: req.body._id }, (err3, s) => {
            if (!err3) {
              getAllComments(req, res);
            }
          });
        } else {
          res
            .status(401)
            .send({ message: "Nemate dostatecna prava pro smazani komentare" });
        }
      });
    }
  });
};

export default {
  getAllComments,
  createComment,
  deleteComment,
  createSubComment,
  updateSubComment
};
