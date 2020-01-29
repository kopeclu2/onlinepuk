import config from "../config.json";
import jwt from "jsonwebtoken";
import Role from "../_helpers/role";
import db from "../_helpers/connectionDb";
// users hardcoded for simplicity, store in a db for production applications
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
  getUserFromToken
};

function checkValidToken(req, res) {
  console.log(req.body);
  jwt.verify(req.body.token, config.secret, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: "Neplatný token" });
    } else {
      res.status(200).send({ message: "OK" });
    }
  });
}
function getUserFromToken(req, res) {
  console.log(req.body);
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
      console.log(user)
      db.connection.query(
        "SELECT * FROM users WHERE id = ?",
        [user.id || user.sub],
        (err, result) => {
          if (err) {
            console.log('ERROR',err);
          } else {
            console.log(result[0])
            const { password, id,...userWithoutPassword } = result[0];
            const newToken = jwt.sign({ sub: id ,...userWithoutPassword }, config.secret, {
              expiresIn: "30m"
            });
            res.send({
              user: { sub: id , token: newToken, ...userWithoutPassword },
              token: newToken
            });
          }
         
        }
      );
    }
  });
}

function signUp({ username, password, email }) {
  return new Promise((res, rej) => {
    db.connection.query(
      "SELECT * FROM users WHERE username= ? ",
      [username],
      (err, result) => {
        if (result.length > 0) {
          rej({ message: `Uzivatelske jmeno ${username} je jiz zabrane` });
        } else {
          db.connection.query(
            "INSERT INTO users (username,email,password) VALUES(?,?,?)",
            [username, email, password],
            (err, result, fields) => {
              if (err) {
                rej({ message: `Registrace selhala` });
              } else {
                res({ message: `Uspensna registrace uzivatele ${username}` });
              }
            }
          );
        }
      }
    );
  });
}

async function authenticate({ username, password }) {
  //const user = users.find(u => u.username === username && u.password === password);
  return new Promise((res, rej) =>
    db.connection.query(
      "SELECT * from users WHERE username = ? AND password = ?",
      [username, password],
      (err, user) => {
        if (user.length > 0) {
          const token = jwt.sign(
            { sub: user[0].id, role: user[0].role },
            config.secret,
            {
              expiresIn: "30m"
            }
          );
          const { password, ...userWithoutPassword } = user[0];
          res({
            ...userWithoutPassword,
            token
          });
        } else {
          res();
        }
      }
    )
  );
}
async function getAll() {
  return users.map(u => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
}

async function getById(id) {
  const user = users.find(u => u.id === parseInt(id));
  if (!user) return;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
