import React, { Component } from "react";
import "./App.css";
import LoginPage from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import NavigationBar from "./components/LandingPage/NavigationBar";
import { createBrowserHistory } from "history";
import Registration from "./pages/Registration";
import { Route, Switch } from "react-router"; // react-router v4/v5
import { ConnectedRouter } from "connected-react-router";
import "./scss/index.scss";
import "./css/index.css";
import ProtectedRoute from "./utils/ProtectedRoute";
import roles from "./utils/roles";
import Admin from "./pages/Admin";
import MatchDetail from "./pages/MatchDetail";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import openSocket from "socket.io-client";
import { loadMatches } from "./actions/matches";
import { connect } from "react-redux";
import { updateAfterGoalSocket } from "./actions/Admin/updateAfterGoalSocket";
import { liveSuccessMatch } from "./actions/Admin/liveSuccessmatch.js";
import { finishedMatch } from "./actions/Admin/finishedSuccess.js";
import "./css/index.css";
import { loadTeams } from "./actions/teams.js";
import {loadUserFromToken} from './actions/loadUserFromToken.js'
import KWD_LOGO from './kwd_logo.png'
import ChatRoom from "./pages/ChatRooms";
import loadComments, { addAllcoments } from "./actions/loadComments";

var moment = require('moment');
moment.locale('cs');
const socket = openSocket.connect("http://localhost:4000");
socket.on('connect', function(){
  'CONNECTION SUCCESS'
});
export const history = createBrowserHistory();

toast.configure();
class App extends Component {
  componentDidMount() {
    this.props.loadUserFromToken()
    setInterval(() => this.props.loadMatches(), 10000);
    this.props.loadMatches();
    socket.on("goal", match => {
      this.props.updateAfterGoalSocket(match);
    });
    socket.on("ALL_COMMENTS", docs => {
      this.props.addAllcoments(docs)
    })
    socket.on("liveSucces", match => {
      console.log('LIVE')
      this.props.liveSuccessMatch(match);
    });
    socket.on("finishedSuccess", match => {
      console.log('finished', match)
      this.props.finishedMatch(match);
    });
    this.props.loadTeams();
    this.props.loadComments()
  }
  render() {
    return (
      <ConnectedRouter history={history}>
        <div style={{ minHeight: "100vh", backgroundColor: 'rgb(245, 245, 245)', position: 'relative' }}  >
          <NavigationBar history={history} />
          <Switch>
            <Route exact path="/login" render={() => <LoginPage />} />
            <Route exact path="/registration" render={() => <Registration />} />
            <Route exact path="/" render={() => <LandingPage />} />
            <Route exact path="/chatRoom" component={ChatRoom} />
            <Route
              exact
              path="/match/:id"
              render={props => <MatchDetail {...props} />}
            />
            <ProtectedRoute
              roles={[roles.admin]}
              path="/admin"
              component={Admin}
            />
          </Switch>
          
        </div>
      </ConnectedRouter>
    );
  }
}

export default connect(
  state => ({ matchesLoaded: state.matches.matchesLoaded }),
  { liveSuccessMatch,loadComments, loadTeams,addAllcoments, updateAfterGoalSocket,loadUserFromToken, finishedMatch, loadMatches }
)(App);

/*
<footer style={{position: 'absolute',width: '100%', bottom: '0px', height:'100px', borderTop: '1px solid #e4e4e4', background:'white'}}>
            <Grid container direction={'row'} alignItems={'center'}>
            <Grid item xs={12} sm={4} style={{display:'flex', justifyContent:'center'}}>
              <Typography style={{color: 'rgba(0, 0, 0, 0.54)'}} >© Copyright Kopecký Lukáš</Typography>
              </Grid>
              <Grid item xs={12} sm={4} style={{display:'flex', justifyContent:'center'}}>
              <img src={KWD_LOGO} style={{width: '120px'}} />
              </Grid>
              
              <Grid item xs={12} sm={4} style={{display:'flex', justifyContent:'center'}}>
              <Typography style={{color: 'rgba(0, 0, 0, 0.54)'}} >Kontakt: lukas.kopecky.494@gmail.com</Typography>
              </Grid>
            </Grid>
           
          </footer>*/