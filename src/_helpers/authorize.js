const expressJwt = require("express-jwt");
import config from '../config.json'
import { secret } from "../config.json";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

module.exports = authorize;

function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    //expressJwt({ secret }),
    (req, res, next) => {
      console.log("USER", req.headers);
      const splitted = req.headers.authorization.split(" ");
      jwt.verify(splitted[1], config.secret, (err2, decoded) => {
        if(!err2) {
          User.findById(decoded.sub, (err, userDb) => {
            console.log("USERDB", userDb);
            if (roles.length && !roles.includes(userDb.role)) {
              return res
                .status(401)
                .json({ message: "Nemáte dostatečná práva ! " });
            } else {
              next();
            }
          });
        } else {
          return res
                .status(401)
                .json({ message: "Spatny token" });
        }
        
      })
     
    
  }
  ];
}
