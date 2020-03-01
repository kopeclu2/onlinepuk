"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _config = _interopRequireWildcard(require("../config.json"));

var _User = require("../models/User.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var expressJwt = require("express-jwt");

module.exports = authorize;

function authorize() {
  var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [//expressJwt({ secret }),
  function (req, res, next) {
    console.log("USER", req.headers);
    var splitted = req.headers.authorization.split(" ");

    _jsonwebtoken["default"].verify(splitted[1], _config["default"].secret, function (err2, decoded) {
      if (!err2) {
        _User.User.findById(decoded.sub, function (err, userDb) {
          console.log("USERDB", userDb);

          if (roles.length && !roles.includes(userDb.role)) {
            return res.status(401).json({
              message: "Nemáte dostatečná práva ! "
            });
          } else {
            next();
          }
        });
      } else {
        return res.status(401).json({
          message: "Spatny token"
        });
      }
    });
  }];
}