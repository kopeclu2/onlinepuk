"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  role: {
    type: String
  },
  password: {
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  img: {
    type: String
  }
}, {
  collection: 'users'
});
var User = mongoose.model('User', userSchema);
exports.User = User;