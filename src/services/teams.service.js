import db from "../_helpers/connectionDb";
import { isEmpty } from "ramda";

const getAllTeams = (req, res) => {
  db.connection.query("SELECT * FROM teams", (err, result, fields) => {
    res.send(result);
  });
};
const getTeamById = async id => {
  return new Promise((res, rej) =>
    db.connection.query(
      "SELECT * FROM teams WHERE id = ? ",
      [id],
      (err, result, fields) => {
        if(!err)
          res(result);
        else 
          rej(new Error('Nezdařilo se najít zápas'));
        }
    )
  );
};
const getTeamByIdCallBack = async (id, callB) => {
  db.connection.query(
    "SELECT * FROM teams WHERE id = ? ",
    [id],
    (err, result, fields) => {
      callB(result);
    }
  );
};

export default {
  getAllTeams,
  getTeamById,
  getTeamByIdCallBack
};
