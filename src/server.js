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
import config from './config.json'
import jwt from 'jsonwebtoken'
import path from 'path'
import matchesService from './services/matches.service';
var serverIO = http.createServer(app);

const io = socketio(serverIO)
try {
  db.connect();
} catch (err) {console.log(err)}


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use(express.static(path.join(__dirname, '/../frontend/build')))
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
  console.log(path.dirname(require.main.filename))
});
app.use('/users',userController);

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
    socket.on('matchGoLive', ({token,match,liveValue}) => {
      console.log(liveValue)
      jwt.verify(token, config.secret, (err,decoded) => {
        if(!err) {
          db.connection.query('SELECT id, role from users WHERE id = ? ', [decoded.sub], (err,result) => {
            if(result[0].role === 'Admin'){
              console.log('LIVE')
              matchesService.setLiveMatch(match,liveValue)
              .then(()=> liveValue && socket.broadcast.emit('liveSucces', {match}))
              .catch(() => {})
            }
          })
        }
      }
    )
    }
  );
  socket.on('matchGoFinished', ({token,match,finishedValue}) => {
    console.log(finishedValue)
    jwt.verify(token, config.secret, (err,decoded) => {
      if(!err) {
        db.connection.query('SELECT id, role from users WHERE id = ? ', [decoded.sub], (err,result) => {
          if(result[0].role === 'Admin'){
            matchesService.setMatchFinished(match,finishedValue)
            .then(()=> finishedValue && socket.broadcast.emit('finishedSuccess', {match}))
            .catch(() => {})
          }
        })
      }
    }
  )
  }
);
})


serverIO.listen(process.env.PORT || 4000,() => {console.log('listen')})