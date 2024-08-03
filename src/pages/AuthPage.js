import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

const AuthPage = ({ onLogin }) => {
  return (
    <div className="auth-page">
      <Switch>
        <Route path="/login">
          <Login onLogin={onLogin} />
        </Route>
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
};

export default AuthPage;
