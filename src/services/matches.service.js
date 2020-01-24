import db from "../_helpers/connectionDb";
import { isEmpty } from "ramda";
import teamsService from "../services/teams.service";
import commentService from "../services/comment.service";
import actionsService from "./matchActions.service";
import { promisePool } from "../_helpers/connectionDb2";

const arrayToPush = new Array();
const getAllMatches = async (req, res) => {
  const [rows, fields, err, a] = await promisePool.query(
    "SELECT * FROM matches"
  );
  let arr = new Array();
  for (let team of rows) {
    const [
      teamHome
    ] = await promisePool.query("SELECT * FROM teams WHERE id =?", [
      team.teamHome
    ]);
    const [
      teamHost
    ] = await promisePool.query("SELECT * FROM teams WHERE id =?", [
      team.teamHost
    ]);
    const userMessages = await commentService.getTeamsUsersComments(team.id);
    const actions = await actionsService.getActionsOfMatchById(team.id);
    arr.push({
      ...team,
      teamHome: { ...teamHome[0] },
      teamHost: { ...teamHost[0] },
      userMessages,
      actions
    });
  }
  res.send(arr);
};

const getMatchId = async (req, res) => {
  const id = parseInt(req.params.id);
  const match = await getMatch(id);
  const teamHome = await teamsService.getTeamById(match[0].teamHome);
  const teamHost = await teamsService.getTeamById(match[0].teamHost);
  const userMessages = await commentService.getTeamsUsersComments(id);
  const actions = await actionsService.getActionsOfMatchById(id);
  res.send({
    ...match[0],
    teamHome: teamHome[0],
    teamHost: teamHost[0],
    actions,
    userMessages
  });
};

const getMatch = async id => {
  return new Promise((res, rej) => {
    db.connection.query(
      "SELECT * FROM `matches` WHERE `id`= ?",
      [id],
      (err, result, fields) => {
        res(result);
      }
    );
  });
};
const createMatch = (req, res) => {
  const {
    name,
    teamHome,
    teamHost,
    scoreHost,
    scoreHome,
    date,
    matchState
  } = req.body;
  db.connection.query(
    "INSERT INTO `matches`(name,teamHome,teamHost,scoreHome,scoreHost,date,matchState) VALUES (?,?,?,?,?,?,?)",
    [name, teamHome, teamHost, scoreHome, scoreHost, date, matchState],
    (err, result, fields) => {
      getAllMatches(req, res);
    }
  );
};

const editMatch = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    name,
    scoreHost,
    scoreHome,
    date,
    matchState,
    stadion
  } = req.body;

  if (isEmpty(req.body)) {
    res.status(400).json({ message: "Prazdna body" });
    return;
  }
  db.connection.query(
    "UPDATE `matches` SET name = ?, scoreHome = ?, scoreHost = ?, date = ?, matchState = ?, stadion = ?  WHERE id= ? ",
    [name, scoreHome, scoreHost, date, matchState,stadion, id],
    (err, result, fields) => {
      res.status(200).json({ message: "Zapas byl uspesne editovan" });
    }
  );
};

const editMatchScore = ({scoreHome,scoreHost,id}) => {
  return new Promise((res,rej) => {
    db.connection.query(
      "UPDATE `matches` SET scoreHome = ?, scoreHost = ? WHERE id= ?",
      [scoreHome, scoreHost,id],
      (err, result, fields) => {
       if(err) {
         rej(err)
       }
       res()
      }
    );
  })
}

const deleteMatch = (req, res) => {
  const id = parseInt(req.params.id);
  db.connection.query(
    "DELETE FROM `matches` WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        res.status(400).json({ message: "Smazani se nepodarilo" });
      } else {
        res.send({ message: "Zapas uspesne smazan" });
      }
    }
  );
};
export default {
  deleteMatch,
  getAllMatches,
  getMatchId,
  createMatch,
  editMatch,
  editMatchScore,
  getMatch
};
