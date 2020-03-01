import db from "../_helpers/connectionDb";
import { isEmpty } from "ramda";
import teamsService from "../services/teams.service";
import commentService from "../services/comment.service";
import actionsService from "./matchActions.service";
import logger from 'heroku-logger'
const arrayToPush = new Array();

const selectAllFromMatches = () => {
  return new Promise((res,rej) => {
    db.connection.query("SELECT * FROM matches ORDER BY date",[], (err, result) => {
      if(!err) {
        res(result)
      } else {
        rej()
      }
    })
  })
}

const selectAllFromMatchesFinished = () => {
  return new Promise((res,rej) => {
    db.connection.query("SELECT * FROM matches WHERE finished = 1 ORDER BY date",[], (err, result) => {
      if(!err) {
        res(result)
      } else {
        rej()
      }
    })
  })
}
const getAllMatches = async (req, res) => {
  const rows = await selectAllFromMatches()
  let arr = new Array();
  for (let team of rows) {
    const teamHome = await teamsService.getTeamById(team.teamHome);
    const teamHost = await teamsService.getTeamById(team.teamHost)
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
const getAllFinsihedMatches = async (req,res) => {
  const rows = await selectAllFromMatchesFinished()
  let arr = new Array();
  for (let team of rows) {
    const teamHome = await teamsService.getTeamById(team.teamHome);
    const teamHost = await teamsService.getTeamById(team.teamHost)
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
}

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
    "INSERT INTO matches(name,teamHome,teamHost,scoreHome,scoreHost,date,matchState,finished,stadion) VALUES (?,?,?,?,?,?,?,?,?)",
    [name, teamHome, teamHost, scoreHome, scoreHost, date,0, 0,''],
    (err, result, fields) => {
      if(err) {
        logger.error('ZAPAS ERRROR', err)
        res.status(400).send({message: 'Nepodařilo se přidat zápas'})
      } else {
        getAllMatches(req, res);
      }
      
    }
  );
};
const setLiveMatch = (match,liveValue) => (new Promise((res,rej) => {
  const value = liveValue ? 1 : 0;
  const neg = liveValue ? 0: 1
  console.log(value, match.id)
    db.connection.query('UPDATE matches SET live = ?, finished = ? WHERE id = ?',[value,neg,match.id], (err,result) => {
      if(err) {
        console.log(err)
        rej()
      } else{
        res()
      }
    })
}))

const setMatchFinished = (match, finshedvalue) => (new Promise((res,rej) => {
  const value = finshedvalue ? 1 : 0;
  db.connection.query('UPDATE matches SET finished = ?, live = ? WHERE id = ?',[value,0,match.id], (err,result) => {
    if(err) {
      console.log(err)
      rej()
    } else{
      res()
    }
  })
}))
const editMatch = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    name,
    scoreHost,
    scoreHome,
    date,
    matchState,
    stadion,
    live,
    finished
  } = req.body;

  if (isEmpty(req.body)) {
    res.status(400).json({ message: "Prazdna body" });
    return;
  }
  const liveValue = live ? 1 :0;
  const finishedValue  = finished ? 1 : 0;
  db.connection.query(
    "UPDATE `matches` SET name = ?, scoreHome = ?, scoreHost = ?, date = ?, matchState = ?, stadion = ?, live = ?, finished = ?   WHERE id= ? ",
    [name, scoreHome, scoreHost, date, matchState,stadion,liveValue, finishedValue, id],
    (err, result, fields) => {
      console.log(err)
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
  getMatch,
  getAllFinsihedMatches,
  setLiveMatch,
  setMatchFinished
};
