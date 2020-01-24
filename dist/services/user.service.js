"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("../config.json"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _role = _interopRequireDefault(require("../_helpers/role"));

var _connectionDb = _interopRequireDefault(require("../_helpers/connectionDb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  signUp: signUp
};
exports["default"] = _default;

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
/*
async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    db.connection.query('SELECT * from users WHERE username = ?', [username], (err,result) => {
        
    })
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}
*/


function _authenticate() {
  _authenticate = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2) {
    var username, password;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
                  }, _config["default"].secret);

                  var _user$ = user[0],
                      _password = _user$.password,
                      userWithoutPassword = _objectWithoutProperties(_user$, ["password"]);

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
  _getAll = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", users.map(function (u) {
              var password = u.password,
                  userWithoutPassword = _objectWithoutProperties(u, ["password"]);

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
  _getById = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(id) {
    var user, password, userWithoutPassword;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
            password = user.password, userWithoutPassword = _objectWithoutProperties(user, ["password"]);
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