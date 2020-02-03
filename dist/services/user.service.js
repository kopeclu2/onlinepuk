"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _config = _interopRequireDefault(require("../config.json"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _role = _interopRequireDefault(require("../_helpers/role"));

var _connectionDb = _interopRequireDefault(require("../_helpers/connectionDb"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// users hardcoded for simplicity, store in a db for production applications
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
  getUserFromToken: getUserFromToken
};
exports["default"] = _default;

function checkValidToken(req, res) {
  console.log(req.body);

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
  console.log(req.body);
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
      console.log(user);

      _connectionDb["default"].connection.query("SELECT * FROM users WHERE id = ?", [user.id || user.sub], function (err, result) {
        if (err) {
          console.log('ERROR', err);
        } else {
          console.log(result[0]);
          var _result$ = result[0],
              password = _result$.password,
              id = _result$.id,
              userWithoutPassword = (0, _objectWithoutProperties2["default"])(_result$, ["password", "id"]);

          var newToken = _jsonwebtoken["default"].sign(_objectSpread({
            sub: id
          }, userWithoutPassword), _config["default"].secret, {
            expiresIn: "30m"
          });

          res.send({
            user: _objectSpread({
              sub: id,
              token: newToken
            }, userWithoutPassword),
            token: newToken
          });
        }
      });
    }
  });
}

function signUp(_ref) {
  var username = _ref.username,
      password = _ref.password,
      email = _ref.email;
  return new Promise(function (res, rej) {
    _connectionDb["default"].connection.query("SELECT * FROM users WHERE username= ? ", [username], function (err, result) {
      if (result.length > 0) {
        rej({
          message: "Uzivatelske jmeno ".concat(username, " je jiz zabrane")
        });
      } else {
        _connectionDb["default"].connection.query("INSERT INTO users (username,email,password) VALUES(?,?,?)", [username, email, password], function (err, result, fields) {
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
              return _connectionDb["default"].connection.query("SELECT * from users WHERE username = ? AND password = ?", [username, password], function (err, user) {
                if (user.length > 0) {
                  var token = _jsonwebtoken["default"].sign({
                    sub: user[0].id,
                    role: user[0].role
                  }, _config["default"].secret, {
                    expiresIn: "30m"
                  });

                  var _user$ = user[0],
                      _password = _user$.password,
                      userWithoutPassword = (0, _objectWithoutProperties2["default"])(_user$, ["password"]);
                  res(_objectSpread({}, userWithoutPassword, {
                    token: token
                  }));
                } else {
                  res();
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

function getAll() {
  return _getAll.apply(this, arguments);
}

function _getAll() {
  _getAll = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", users.map(function (u) {
              var password = u.password,
                  userWithoutPassword = (0, _objectWithoutProperties2["default"])(u, ["password"]);
              return userWithoutPassword;
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getAll.apply(this, arguments);
}

function getById(_x2) {
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