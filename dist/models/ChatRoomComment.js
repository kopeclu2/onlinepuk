"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatRoomComment = void 0;

var _User = require("./User");

var mongoose = require('mongoose');

var chatRoomCommentSchema = new mongoose.Schema({
  content: {
    type: String
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date
  },
  isSubComment: {
    type: Boolean
  },
  subComments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRoomComment'
  }]
}, {
  collection: 'chatRoom'
});
var ChatRoomComment = mongoose.model('ChatRoomComment', chatRoomCommentSchema);
exports.ChatRoomComment = ChatRoomComment;