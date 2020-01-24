require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
import errorHandler from './_helpers/error-handler'
import userController from './controllers/users.controller'
import matchController from './controllers/matches.controller'
import db from './_helpers/connectionDb'
import teamsController from './controllers/teams.controller'
import commentController from './controllers/usersComments.controller'
import matchActionController from './controllers/matchAction.controller'
import http from 'http'
import socketio from 'socket.io'
import socketioAuth from 'socketio-auth'
import socketioJWT from 'socketio-jwt'
import config from './config.json'
import jwtDecode from 'jwt-decode'
import jwt from 'jsonwebtoken'
import path from 'path'
import matchesService from './services/matches.service';
import matchActionsService from './services/matchActions.service';
var serverIO = http.createServer(app);

const io = socketio(serverIO)
db.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users',userController);
app.use(express.static(path.join(__dirname, 'client/build')))
app.use('/matches', matchController )
app.use('/teams', teamsController)
app.use('/comment', commentController)
app.use('/actions', matchActionController)
// global error handler
app.use(errorHandler);

io.on('connection', function (socket) {
    socket.on('goalScoreAdmin', function ({token, match}) {
      jwt.verify(token, config.secret, (err,decoded) => {
        if(!err) {
          db.connection.query('SELECT id, role from users WHERE id = ? ', [decoded.sub], (err,result) => {
            if(result[0].role === 'Admin'){
                matchesService.editMatchScore(match)
                .then(() => {
                  matchesService.getMatch(match.id).then(match => {
                    const findedMatch = match[0];
                    socket.broadcast.emit('goal', { id: findedMatch.id, scoreHome: findedMatch.scoreHome, scoreHost: findedMatch.scoreHost})
                  })
                })
                .catch(err => console.log('PROMISE', err))
            }
          })
        }
      })

      
    });
    
  });

serverIO.listen(process.env.PORT || 4000,() => {console.log('listen')})