"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _connectionDb = _interopRequireDefault(require("../_helpers/connectionDb"));

var _matches = _interopRequireDefault(require("../services/matches.service"));

var _authorize = _interopRequireDefault(require("../_helpers/authorize"));

var _role = _interopRequireDefault(require("../_helpers/role"));

var router = _express["default"].Router();

router.get("", function (req, res) {
  _matches["default"].getAllMatches(req, res);
});
router.get("/:id", getMatchId);
router.post("/create", (0, _authorize["default"])(_role["default"].Admin), createMatch);
router.post("/:id/edit", (0, _authorize["default"])(_role["default"].Admin), editMatch);
router["delete"]("/:id/delete", (0, _authorize["default"])(_role["default"].Admin), deleteMatch);

function getMatchId(req, res) {
  _matches["default"].getMatchId(req, res);
}

function deleteMatch(req, res) {
  _matches["default"].deleteMatch(req, res);
}

function createMatch(req, res) {
  _matches["default"].createMatch(req, res);
}

function editMatch(req, res) {
  _matches["default"].editMatch(req, res);
}

module.exports = router;