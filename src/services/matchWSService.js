import {User} from '../models/User'
import logger from 'heroku-logger'
import matchesService from './matches.service';
import jwt from 'jsonwebtoken'
import config from '../config.json'

export const matchWSService = (socket) => {
    socket.on("goalScoreAdmin", function({ token, match }) {
        logger.info(`Match id:${match.id} goes CHANGES SCORE`);
        jwt.verify(token, config.secret, (err, decoded) => {
          if (!err) {
            User.findById(decoded.sub, (err, user) => {
             
              if (user.role === "Admin") {
                matchesService
                  .editMatchScore(match)
                  .then(() => {
                    matchesService.getMatch(match.id).then(match => {
                      const findedMatch = match[0];
                      socket.broadcast.emit("goal", {
                        id: findedMatch.id,
                        scoreHome: findedMatch.scoreHome,
                        scoreHost: findedMatch.scoreHost
                      });
                    });
                  })
                  .catch(err => console.log("PROMISE", err));
              }
            });
          }
        });
      });
      socket.on("matchGoLive", ({ token, match, liveValue }) => {
        logger.info(`Match id:${match.id} goes LIVE`);
        jwt.verify(token, config.secret, (err, decoded) => {
          if (!err) {
            User.findById(decoded.sub, (err, user) => {
              if (user.role === "Admin") {
                matchesService
                  .setLiveMatch(match, liveValue)
                  .then(
                    () =>
                      liveValue && socket.broadcast.emit("liveSucces", { match })
                  )
                  .catch(() => {});
              }
            });
          } else {
            console.log("ERROR WS", "color: red");
          }
        });
      });
      socket.on("matchGoFinished", ({ token, match, finishedValue }) => {
        logger.info(`Match id:${match.id} goes finished`);
        jwt.verify(token, config.secret, (err, decoded) => {
          if (!err) {
            User.findById(decoded.sub, (err, user) => {
              if (user.role === "Admin") {
                matchesService
                  .setMatchFinished(match, finishedValue)
                  .then(
                    () =>
                      finishedValue &&
                      socket.broadcast.emit("finishedSuccess", { match })
                  )
                  .catch(() => {});
              }
            });
          }
        });
      });
}