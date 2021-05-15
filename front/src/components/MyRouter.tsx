import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./NavBar.css";
import { useAppState } from "../helpers/use_app_state";
import { Login } from "../pages/login";
import { NavBar } from "./NavBar";
import { ErrorHolder } from "./ErrorHolder";
import { Vehicles } from "../pages/Vehicles";

export default function App() {
  const { user } = useAppState();
  const isAuthenticated = user.accessToken ?? user.email;
  console.log("isAuthenticated", isAuthenticated);

  return (
    <Router>
      <NavBar />
      <ErrorHolder />
      <div className="content">
        <Switch>
          <Route exact path="/vehicles">
            <Vehicles />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route
            render={() => {
              return !isAuthenticated ? (
                <Redirect to="/vehicles" />
              ) : (
                <Redirect to="/vehicles" />
              );
            }}
          />
          <Route>
            <Redirect to="/vehicles" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
