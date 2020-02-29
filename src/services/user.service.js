import config from "../config.json";
import jwt from "jsonwebtoken";
import Role from "../_helpers/role";
import db from "../_helpers/connectionDb";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { has } from "ramda";
// users hardcoded for simplicity, store in a db for production applications

const saltRound = 15;
const users = [
  {
    id: 1,
    username: "admin",
    password: "admin",
    firstName: "Admin",
    lastName: "User",
    role: Role.Admin
  },
  {
    id: 2,
    username: "user",
    password: "user",
    firstName: "Normal",
    lastName: "User",
    role: Role.User
  }
];

export default {
  authenticate,
  getAll,
  getById,
  signUp,
  checkValidToken,
  getUserFromToken,
  deleteUser
};

function checkValidToken(req, res) {
  jwt.verify(req.body.token, config.secret, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: "Neplatný token" });
    } else {
      res.status(200).send({ message: "OK" });
    }
  });
}
function getUserFromToken(req, res) {
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({
      message: "Chybí token"
    });
  }

  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      throw err;
    } else {
      User.findOne({ _id: user.sub }, (err, user) => {
        if (user !== null && err === null) {
          const token = jwt.sign(
            { sub: user._id, role: user.role },
            config.secret,
            {
              expiresIn: "1h"
            }
          );
          res.send({
            username: user.username,
            sub: user._id,
            email: user.email,
            role: user.role,
            token
          });
        } else {
          res.status(401).send({ message: "Spatny autorizacni token" });
        }
      });
    }
  });
}
function deleteUser(req,res) {
  User.findOneAndDelete({_id: req.body._id},(err, user) => {
    if(!err) {
      getAll(req,res)
    } else {
        res.status(400).send({message: 'Nepodarilo se vymazat uzivatele'})
    }
      
  })
}
function signUp({ username, password, email }) {
  return new Promise((res, rej) => {
    User.findOne({ username: username }, (err, result) => {
      if (result !== null) {
        rej({ message: `Uzivatelske jmeno ${username} je jiz zabrane` });
        return;
      } else {
        User.findOne({ email: email }, (err, result) => {
          if (result !== null) {
            rej({ message: `Email ${email} je jiz zabrany` });
            return;
          } else {
            const salt = bcrypt.genSaltSync(saltRound);
            const hash = bcrypt.hashSync(password, salt);
            const user = new User({
              username,
              password: hash,
              email,
              role: Role.User,
            });
            user.save((err, user) => {
              if (err) {
                rej({ message: `Registrace selhala` });
              } else {
                res({ message: `Uspensna registrace uzivatele ${username}` });
              }
            });
          }
        });
      }
    });
  
  });
}

async function authenticate({ username, password }) {
  return new Promise(
    (res, rej) =>
      User.findOne({ username: username }, (err, user) => {
        if (user !== null) {
          if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
              { sub: user._id, role: user.role },
              config.secret,
              {
                expiresIn: "1h"
              }
            );
            const { password, ...userWithoutPassword } = user;
            res({
              username: user.username,
              sub: user._id,
              email: user.email,
              role: user.role,
              token
            });
          } else {
            rej({ message: "Špatné ověřovací údaje" });
          }
        } else {
          rej({ message: "Špatné ověřovací údaje" });
        }
      })
  );
}
async function getAll(req,res) {
    const query = User.find({}).select("_id username email role")
    query.exec((err,value) => {
      res.send(value)
    })

}

async function getById(id) {
  const user = users.find(u => u.id === parseInt(id));
  if (!user) return;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
