"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyTokenUSer = exports.getAllComments = exports.chatWebSocket = void 0;

var _ChatRoomComment = require("../models/ChatRoomComment");

var _config = _interopRequireDefault(require("../config.json"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _ramda = require("ramda");

var chatWebSocket = function chatWebSocket(socket) {
  socket.on("createComment", function (_ref) {
    var token = _ref.token,
        user = _ref.user,
        content = _ref.content;
    console.log({
      token: token,
      user: user,
      content: content,
      socket: socket
    });
    verifyTokenUSer(token, function (err, decoded) {
      if (!err) {
        var comment = new _ChatRoomComment.ChatRoomComment({
          content: content,
          postedBy: [user],
          date: new Date(),
          isSubComment: false,
          subComments: []
        });
        comment.save(function (err, comment) {
          if (!err) {
            getAllComments(function (docs) {
              socket.broadcast.emit("ALL_COMMENTS", docs);
            });
          }
        });
      }
    });
  });
  socket.on("deleteComment", function (_ref2) {
    var token = _ref2.token,
        user = _ref2.user,
        _id = _ref2._id;

    _ChatRoomComment.ChatRoomComment.findOne({
      _id: _id
    }, function (err1, one) {
      if (err1 || (0, _ramda.isNil)(one)) {
        console.log("error");
      } else {
        verifyTokenUSer(token, function (err2, decoded) {
          console.log("DECODED", decoded);
          console.log("POSTED BY", one.postedBy.toString());

          if (one.postedBy.toString() === decoded.sub) {
            _ChatRoomComment.ChatRoomComment.findOneAndDelete({
              _id: _id
            }, function (err3, s) {
              if (!err3) {
                getAllComments(function (docs) {
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
  socket.on("createSubComment", function (_ref3) {
    var token = _ref3.token,
        parrentID = _ref3.parrentID,
        content = _ref3.content,
        user = _ref3.user;
    var parentComment = parrentID;
    verifyTokenUSer(token, function (err2, decoded) {
      if (decoded) {
        var comment = new _ChatRoomComment.ChatRoomComment({
          content: content,
          postedBy: [user],
          date: new Date(),
          isSubComment: true
        });
        comment.save();

        _ChatRoomComment.ChatRoomComment.findOne({
          _id: parentComment
        }, function (err, oldComment) {
          oldComment.subComments.push(comment);
          oldComment.save(function (err, comment) {
            if (!err) {
              getAllComments(function (docs) {
                socket.broadcast.emit("ALL_COMMENTS", docs);
              });
            }
          });
        });
      }
    });
  });
  socket.on("updateSubComment", function (_ref4) {
    var token = _ref4.token,
        _id = _ref4._id,
        content = _ref4.content;
    console.log({
      token: token,
      _id: _id,
      content: content
    });

    _ChatRoomComment.ChatRoomComment.findOne({
      _id: _id
    }, function (err1, one) {
      if (err1) {
        console.log("ERR1", err1);
      } else {
        verifyTokenUSer(token, function (err2, decoded) {
          if (one.postedBy.toString() === decoded.sub) {
            one.content = content;
            one.save(function (err, done) {
              if (!err) {
                getAllComments(function (docs) {
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

exports.chatWebSocket = chatWebSocket;

var getAllComments = function getAllComments(callback) {
  _ChatRoomComment.ChatRoomComment.find({}).populate("subComments").populate("postedBy", "_id username email").populate({
    path: "subComments",
    populate: {
      path: "postedBy",
      select: "_id username email"
    }
  }).where("isSubComment").equals(false).sort({
    date: -1
  }).exec().then(function (docs) {
    return callback(docs);
  });
};

exports.getAllComments = getAllComments;

var verifyTokenUSer = function verifyTokenUSer(token, callBack) {
  _jsonwebtoken["default"].verify(token, _config["default"].secret, function (err2, decoded) {
    callBack(err2, decoded);
  });
};

exports.verifyTokenUSer = verifyTokenUSer;