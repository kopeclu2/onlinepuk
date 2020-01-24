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
import { Button } from "@material-ui/core";
import openSocket from "socket.io-client";
import matchGoalNotification from "./components/MatchGoalNotif";
import { match } from "ramda";
import { loadMatches } from "./actions/matches";
import { connect } from "react-redux";
import { updateAfterGoalSocket } from "./actions/Admin/updateAfterGoalSocket";
const socket = openSocket.connect("http://localhost:4000");

export const history = createBrowserHistory();

toast.configure();
class App extends Component {
  componentDidMount() {
    this.props.loadMatches();
    socket.on("goal", match => {
      this.props.updateAfterGoalSocket(match);
    });
  }
  render() {
    return (
      <ConnectedRouter history={history}>
        <div style={{ minHeight: "100vh" }}>
          <NavigationBar history={history} />
          <Switch>
            <Route exact path="/login" render={() => <LoginPage />} />
            <Route exact path="/registration" render={() => <Registration />} />
            <Route exact path="/" render={() => <LandingPage />} />
            <Route exact path="/match/:id" render={(props) => <MatchDetail {...props} /> } />
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

export default connect((state) => ({matchesLoaded: state.matches.matchesLoaded}), { updateAfterGoalSocket, loadMatches })(App);
