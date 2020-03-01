"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ChatRoomComment = require("../models/ChatRoomComment");

var _config = _interopRequireDefault(require("../config.json"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _ramda = require("ramda");

var getAllComments = function getAllComments(req, res) {
  var comments = _ChatRoomComment.ChatRoomComment.find({}).populate("subComments").populate("postedBy", "_id username email").populate({
    path: 'subComments',
    populate: {
      path: 'postedBy',
      select: "_id username email"
    }
  }).where("isSubComment").equals(false).where("postedBy").ne(null).sort({
    date: -1
  }).exec().then(function (docs) {
    return res.send(docs);
  });
};

var createComment = function createComment(req, res) {
  var comment = new _ChatRoomComment.ChatRoomComment({
    content: req.body.content,
    postedBy: [req.body.user],
    date: new Date(),
    isSubComment: false,
    subComments: []
  });
  comment.save(function (err, comment) {
    console.log(err);

    if (!err) {
      _ChatRoomComment.ChatRoomComment.findOne({
        _id: comment._id
      }).populate("postedBy", "_id username email").exec().then(function (docs) {
        res.status(200).send(docs);
      });
    }
  });
};

var createSubComment = function createSubComment(req, res) {
  var parentComment = req.body.parrentID;
  console.log(req.body);
  var comment = new _ChatRoomComment.ChatRoomComment({
    content: req.body.content,
    postedBy: [req.body.user],
    date: new Date(),
    isSubComment: true
  });
  comment.save();

  _ChatRoomComment.ChatRoomComment.findOne({
    _id: parentComment
  }, function (err, oldComment) {
    oldComment.subComments.push(comment);
    oldComment.save(function (err, comment) {
      console.log(err, comment);

      if (!err) {
        getAllComments(req, res);
      }
    });
  });
};

var updateSubComment = function updateSubComment(req, res) {
  var splitted = req.headers.authorization.split(" ");

  _ChatRoomComment.ChatRoomComment.findOne({
    _id: req.body._id
  }, function (err1, one) {
    if (err1 || (0, _ramda.isNil)(one)) {
      res.status(401).send({
        message: "Komentar nenalezen"
      });
    } else {
      _jsonwebtoken["default"].verify(splitted[1], _config["default"].secret, function (err2, decoded) {
        if (one.postedBy.toString() === decoded.sub) {
          one.content = req.body.content;
          one.save(function (err, done) {
            if (!err) {
              getAllComments(req, res);
            }
          });
        } else {
          res.status(401).send({
            message: "Chyba"
          });
        }
      });
    }
  });
};

var deleteComment = function deleteComment(req, res) {
  var splitted = req.headers.authorization.split(" ");

  _ChatRoomComment.ChatRoomComment.findOne({
    _id: req.body._id
  }, function (err1, one) {
    if (err1 || (0, _ramda.isNil)(one)) {
      res.status(401).send({
        message: "Komentar nenalezen"
      });
    } else {
      _jsonwebtoken["default"].verify(splitted[1], _config["default"].secret, function (err2, decoded) {
        if (one.postedBy.toString() === decoded.sub) {
          _ChatRoomComment.ChatRoomComment.findOneAndDelete({
            _id: req.body._id
          }, function (err3, s) {
            if (!err3) {
              getAllComments(req, res);
            }
          });
        } else {
          res.status(401).send({
            message: "Nemate dostatecna prava pro smazani komentare"
          });
        }
      });
    }
  });
};

var _default = {
  getAllComments: getAllComments,
  createComment: createComment,
  deleteComment: deleteComment,
  createSubComment: createSubComment,
  updateSubComment: updateSubComment
};
exports["default"] = _default;