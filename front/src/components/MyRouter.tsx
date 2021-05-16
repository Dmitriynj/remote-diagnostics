import { Container } from "@material-ui/core";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useAppState } from "../helpers/use_app_state";
import { Login } from "../pages/Login";
import { VehicleDetails } from "../pages/VehicleDetails";
import { Vehicles } from "../pages/Vehicles";
import { AlertHolder } from "./AlertHolder";
import { PageHeader } from "./PageHeader";
import { Sidebar } from "./Sidebar";

const PrivateRoute = ({ component, ...rest }: any) => {
  const { user } = useAppState();

  console.log("user.isAuth", user.isAuth);

  const routeComponent = (props: any) => {
    return !user.isAuth ? (
      <Redirect to="/login" />
    ) : (
      React.createElement(component, props)
    );
  };

  return <Route {...rest} render={routeComponent} />;
};

export default function MyRouter() {
  return (
    <Router>
      <PageHeader />
      <Sidebar />
      <AlertHolder />
      <Switch>
        <PrivateRoute exact path="/vehicles" component={Vehicles} />
        <PrivateRoute exact path="/vehicles/:id" component={VehicleDetails} />
        <Route exact path="/login">
          <Container maxWidth="sm">
            <Login />
          </Container>
        </Route>
        <Route>
          <Redirect to="/vehicles" />
        </Route>
      </Switch>
    </Router>
  );
}
