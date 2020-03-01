"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _connectionDb = _interopRequireDefault(require("../_helpers/connectionDb"));

var _matches = _interopRequireDefault(require("../services/matches.service"));

var _authorize = _interopRequireDefault(require("../_helpers/authorize"));

var _role = _interopRequireDefault(require("../_helpers/role"));

var _chatRoomService = _interopRequireDefault(require("../services/chatRoomService"));

var router = _express["default"].Router();

router.get("", function (req, res) {
  _matches["default"].getAllMatches(req, res);
});
router.get("/getAllComments", function (req, res) {
  _chatRoomService["default"].getAllComments(req, res);
});
router.post("/delete", function (req, res) {
  _chatRoomService["default"].deleteComment(req, res);
});
router.post("/create", (0, _authorize["default"])(), createComment);
router.post("/createSubComment", (0, _authorize["default"])(), createSubComment);
router.post("/updateComment", (0, _authorize["default"])(), updateSubComment);

function createComment(req, res) {
  _chatRoomService["default"].createComment(req, res);
}

function createSubComment(req, res) {
  _chatRoomService["default"].createSubComment(req, res);
}

function updateSubComment(req, res) {
  _chatRoomService["default"].updateSubComment(req, res);
}

module.exports = router;