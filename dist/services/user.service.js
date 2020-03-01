"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("../config.json"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _role = _interopRequireDefault(require("../_helpers/role"));

var _connectionDb = _interopRequireDefault(require("../_helpers/connectionDb"));

var _User = require("../models/User.js");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _ramda = require("ramda");

// users hardcoded for simplicity, store in a db for production applications
var saltRound = 15;
var users = [{
  id: 1,
  username: "admin",
  password: "admin",
  firstName: "Admin",
  lastName: "User",
  role: _role["default"].Admin
}, {
  id: 2,
  username: "user",
  password: "user",
  firstName: "Normal",
  lastName: "User",
  role: _role["default"].User
}];
var _default = {
  authenticate: authenticate,
  getAll: getAll,
  getById: getById,
  signUp: signUp,
  checkValidToken: checkValidToken,
  getUserFromToken: getUserFromToken,
  deleteUser: deleteUser,
  setUserRole: setUserRole
};
exports["default"] = _default;

function checkValidToken(req, res) {
  _jsonwebtoken["default"].verify(req.body.token, _config["default"].secret, function (err, decoded) {
    if (err) {
      res.status(401).send({
        message: "Neplatný token"
      });
    } else {
      res.status(200).send({
        message: "OK"
      });
    }
  });
}

function getUserFromToken(req, res) {
  var token = req.body.token;

  if (!token) {
    return res.status(401).json({
      message: "Chybí token"
    });
  }

  _jsonwebtoken["default"].verify(token, _config["default"].secret, function (err, user) {
    if (err) {
      throw err;
    } else {
      _User.User.findOne({
        _id: user.sub
      }, function (err, user) {
        if (user !== null && err === null) {
          var _token = _jsonwebtoken["default"].sign({
            sub: user._id,
            role: user.role
          }, _config["default"].secret, {
            expiresIn: "1h"
          });

          res.send({
            username: user.username,
            sub: user._id,
            email: user.email,
            role: user.role,
            token: _token
          });
        } else {
          res.status(401).send({
            message: "Spatny autorizacni token"
          });
        }
      });
    }
  });
}

function setUserRole(req, res) {
  _User.User.findByIdAndUpdate(req.body._id, {
    role: req.body.role
  }, function (err, user) {
    if (!err) {
      getAll(req, res);
    } else {
      res.status(400).send({
        message: 'Nepodarilo se aktualizovat uzivatele'
      });
    }
  });
}

function deleteUser(req, res) {
  _User.User.findOneAndDelete({
    _id: req.body._id
  }, function (err, user) {
    if (!err) {
      getAll(req, res);
    } else {
      res.status(400).send({
        message: 'Nepodarilo se vymazat uzivatele'
      });
    }
  });
}

function signUp(_ref) {
  var username = _ref.username,
      password = _ref.password,
      email = _ref.email;
  return new Promise(function (res, rej) {
    _User.User.findOne({
      username: username
    }, function (err, result) {
      if (result !== null) {
        rej({
          message: "Uzivatelske jmeno ".concat(username, " je jiz zabrane")
        });
        return;
      } else {
        _User.User.findOne({
          email: email
        }, function (err, result) {
          if (result !== null) {
            rej({
              message: "Email ".concat(email, " je jiz zabrany")
            });
            return;
          } else {
            var salt = _bcrypt["default"].genSaltSync(saltRound);

            var hash = _bcrypt["default"].hashSync(password, salt);

            var user = new _User.User({
              username: username,
              password: hash,
              email: email,
              role: _role["default"].User
            });
            user.save(function (err, user) {
              if (err) {
                rej({
                  message: "Registrace selhala"
                });
              } else {
                res({
                  message: "Uspensna registrace uzivatele ".concat(username)
                });
              }
            });
          }
        });
      }
    });
  });
}

function authenticate(_x) {
  return _authenticate.apply(this, arguments);
}

function _authenticate() {
  _authenticate = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(_ref2) {
    var username, password;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            username = _ref2.username, password = _ref2.password;
            return _context.abrupt("return", new Promise(function (res, rej) {
              return _User.User.findOne({
                username: username
              }, function (err, user) {
                if (user !== null) {
                  if (_bcrypt["default"].compareSync(password, user.password)) {
                    var token = _jsonwebtoken["default"].sign({
                      sub: user._id,
                      role: user.role
                    }, _config["default"].secret, {
                      expiresIn: "1h"
                    });

                    var _password = user.password,
                        userWithoutPassword = (0, _objectWithoutProperties2["default"])(user, ["password"]);
                    res({
                      username: user.username,
                      sub: user._id,
                      email: user.email,
                      role: user.role,
                      token: token
                    });
                  } else {
                    rej({
                      message: "Špatné ověřovací údaje"
                    });
                  }
                } else {
                  rej({
                    message: "Špatné ověřovací údaje"
                  });
                }
              });
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _authenticate.apply(this, arguments);
}

function getAll(_x2, _x3) {
  return _getAll.apply(this, arguments);
}

function _getAll() {
  _getAll = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = _User.User.find({}).select("_id username email role");
            query.exec(function (err, value) {
              res.send(value);
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getAll.apply(this, arguments);
}

function getById(_x4) {
  return _getById.apply(this, arguments);
}

function _getById() {
  _getById = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(id) {
    var user, password, userWithoutPassword;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = users.find(function (u) {
              return u.id === parseInt(id);
            });

            if (user) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return");

          case 3:
            password = user.password, userWithoutPassword = (0, _objectWithoutProperties2["default"])(user, ["password"]);
            return _context3.abrupt("return", userWithoutPassword);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getById.apply(this, arguments);
}