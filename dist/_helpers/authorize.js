"use strict";

var _config = require("../config.json");

var expressJwt = require('express-jwt');

module.exports = authorize;

function authorize() {
  var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  // roles param can be a single role string (e.g. Role.User or 'User') 
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [// authenticate JWT token and attach user to request object (req.user)
  expressJwt({
    secret: _config.secret
  }), // authorize based on user role
  function (req, res, next) {
    console.log(res.user);

    if (roles.length && !roles.includes(req.user.role)) {
      // user's role is not authorized
      return res.status(401).json({
        message: 'Nemáte dostatečná práva ! '
      });
    } // authentication and authorization successful


    next();
  }];
}