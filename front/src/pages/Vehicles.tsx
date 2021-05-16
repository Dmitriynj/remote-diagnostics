import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import { instance } from "../helpers/axios_defaults";
import { MySkeleton } from "../components/Skeleton";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  arrowIcon: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export const Vehicles = () => {
  const classes = useStyles();
  const [vehicles, setVehicles] = useState([]);
  const history = useHistory();

  useEffect(() => {
    instance.get("/vehicles/all").then((response) => {
      console.log(response);
      setVehicles(response.data);
    });
  }, []);

  const onChooseVehicle = (id: string) => {
    instance.get(`/vehicles/${id}`).then((response) => {
      console.log(response);
      const { mark, model, vin_code } = response.data;
      history.push({
        pathname: `/vehicles/${id}`,
        state: {
          pageName: `${mark} ${model} (${vin_code})`,
          detail: response.data,
        },
      });
    });
  };

  const list = vehicles.length ? (
    vehicles.map(({ id, mark, model, engine_state }: any) => {
      const engineStatus = engine_state === "on" ? "primary" : "action";
      return (
        <ListItem button divider key={id} onClick={() => onChooseVehicle(id)}>
          <ListItemIcon>
            <DriveEtaIcon color={engineStatus} />
          </ListItemIcon>
          <ListItemText primary={mark + " " + model} />
          <ListItemIcon className={classes.arrowIcon}>
            <ArrowRightIcon />
          </ListItemIcon>
        </ListItem>
      );
    })
  ) : (
    <MySkeleton />
  );

  return (
    <List component="nav" className={classes.root} aria-label="contacts">
      {list}
    </List>
  );
};
