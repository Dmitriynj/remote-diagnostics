import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useAppState } from "../helpers/use_app_state";
import PeopleIcon from "@material-ui/icons/People";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import WarningIcon from "@material-ui/icons/Warning";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import { Avatar } from "@material-ui/core";
import { initialContext } from "../helpers/AppContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const actions = (avatar: string) => [
  {
    id: 1,
    name: "Персональные данные",
    icon: <Avatar alt="Remy Sharp" src={avatar} />,
    redirectTo: "/person",
  },
  { id: 2, name: "Автопарк", icon: <DriveEtaIcon />, redirectTo: "/vehicles" },
  { id: 3, name: "Сотрудники", icon: <PeopleIcon />, redirectTo: "/employees" },
  {
    id: 4,
    name: "Коды ошибок",
    icon: <WarningIcon />,
    redirectTo: "/dtccodes",
  },
];

export const Sidebar = () => {
  const { sidebarOpened, setSidebarOpened } = useAppState();
  const { user, setUser } = useAppState();
  const history = useHistory();

  const redirect = (path: string) => {
    history.push(path);
  };

  return (
    <Drawer
      anchor={"left"}
      open={sidebarOpened}
      onClose={() => setSidebarOpened(false)}
    >
      <List>
        {actions(user.avatar).map(({ id, name, icon, redirectTo }) => (
          <ListItem
            button
            key={id}
            onClick={() => {
              setSidebarOpened(false);
              redirect(redirectTo);
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button key="1">
          <ListItemIcon>
            <ExitToAppIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            primary="Выйти из системы"
            onClick={() => {
              setSidebarOpened(false);
              setUser(initialContext.user);
            }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};
