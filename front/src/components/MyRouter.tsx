import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
// import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useAppState } from "../helpers/use_app_state";
import { Login } from "../pages/Login";
// import { ErrorHolder } from "./ErrorHolder";
// import { Vehicles } from "../pages/Vehicles";
import { PageHeader } from "./PageHeader";

export default function App() {
  const { user } = useAppState();
  const isAuthenticated = user.email;

  return (
    <Container maxWidth="sm">
      <Router>
        <PageHeader />

        <div className="content">{/* <ErrorHolder /> */}</div>
        <Switch>
          <Route exact path="/vehicles">
            {/* <Vehicles /> */}
          </Route>
          <Route exact path="/login">
            <div className="content">
              <Login />
            </div>
          </Route>
          <Route
            render={() => {
              return !isAuthenticated ? (
                <Redirect to="/login" />
              ) : (
                <Redirect to="/vehicles" />
              );
            }}
          />
        </Switch>
      </Router>
    </Container>
  );
}
