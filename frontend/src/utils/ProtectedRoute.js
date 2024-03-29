import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {push} from 'connected-react-router'
const PrivateRoute = ({ component: Component, roles, push,user, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = user;

      if (!currentUser.isAuthenticated) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      // check if route is restricted by role
      if (roles && roles.indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/" }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
export default connect(state => ({ user: state.user }),{push})(PrivateRoute);
