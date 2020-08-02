import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import User from "./Components/User";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/users/:userId"
          render={({ match }) => {
            if (
              localStorage.getItem("loggedIn") === true ||
              localStorage.getItem("loggedIn") === "true"
            ) {
              return <User match={match} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          path="/dashboard"
          render={props => {
            if (
              localStorage.getItem("loggedIn") === true ||
              localStorage.getItem("loggedIn") === "true"
            ) {
              return <Dashboard {...props} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route exact component={Login} />
      </Switch>
    </div>
  );
}

export default App;
