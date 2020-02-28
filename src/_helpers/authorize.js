const expressJwt = require("express-jwt");
import { secret } from "../config.json";
import { User } from "../models/User.js";

module.exports = authorize;

function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    expressJwt({ secret }),
    (req, res, next) => {
      console.log("USER", req.user);
      User.findById(req.user.sub, (err, userDb) => {
        console.log("USERDB", userDb);
        if (roles.length && !roles.includes(userDb.role)) {
          return res
            .status(401)
            .json({ message: "Nemáte dostatečná práva ! " });
        }
      });
      next();
    }
  ];
}
