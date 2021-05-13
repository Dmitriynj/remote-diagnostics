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

export default function App() {
  const { user } = useAppState();
  const isAuthenticated = user.accessToken ?? user.email;
  console.log("isAuthenticated", isAuthenticated);

  return (
    <Router>
      <NavBar />

      <div className="content">
        <Switch>
          <Route path="/login">About</Route>
          <Route path="/users">Users</Route>
          <Route path="/home">Home</Route>
          <Route
            render={() =>
              !isAuthenticated ? <Login /> : <Redirect to="home" />
            }
          />
        </Switch>
      </div>
    </Router>
  );
}
