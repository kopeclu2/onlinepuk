"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../services/user.service"));

var _authorize = _interopRequireDefault(require("../_helpers/authorize"));

var _role = _interopRequireDefault(require("../_helpers/role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

// routes
router.post('/authenticate', authenticate); // public route

router.get('/', (0, _authorize["default"])(_role["default"].Admin), getAll); // admin only

router.get('/:id', (0, _authorize["default"])(), getById);
router.post('/signup', signup); // all authenticated users

var _default = router;
exports["default"] = _default;

function signup(req, res, next) {
  _user["default"].signUp(req.body).then(function (result) {
    return authenticate(req, res, next);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}

function authenticate(req, res, next) {
  _user["default"].authenticate(req.body).then(function (user) {
    return user ? res.json(user) : res.status(400).json({
      message: 'Username or password is incorrect'
    });
  })["catch"](function (err) {
    return next(err);
  });
}

function getAll(req, res, next) {
  _user["default"].getAll().then(function (users) {
    return res.json(users);
  })["catch"](function (err) {
    return next(err);
  });
}

function getById(req, res, next) {
  var currentUser = req.user;
  var id = parseInt(req.params.id); // only allow admins to access other user records

  if (id !== currentUser.sub && currentUser.role !== _role["default"].Admin) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  _user["default"].getById(req.params.id).then(function (user) {
    return user ? res.json(user) : res.sendStatus(404);
  })["catch"](function (err) {
    return next(err);
  });
}