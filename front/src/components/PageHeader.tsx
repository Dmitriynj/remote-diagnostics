import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAppState } from "../helpers/use_app_state";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Spinner } from "./Spinner";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  spinnerHolder: {
    height: 4,
  },
  pageName: {
    width: 350,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const PAGE_NAME: PageName = {
  "/login": "Вход в систему",
  "/vehicles": "Весь автопарк",
};

interface PageName {
  [key: string]: string;
}

export const PageHeader = () => {
  const classes = useStyles();
  const { user, loading, setSidebarOpened } = useAppState();
  const location = useLocation();
  const history = useHistory();
  const [pageName, setPageName] = useState();
  const showedPageName = PAGE_NAME[location.pathname] || pageName;

  useEffect(() => {
    history.listen((location: any, action: any) => {
      // location is an object like window.location
      console.log(action, location.pathname, location.state);
      if (location?.state?.pageName) {
        setPageName(location.state.pageName);
      }
    });
  }, [history]);

  const openSidebar = () => setSidebarOpened(true);

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        {user.isAuth && (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={openSidebar}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" color="inherit" className={classes.pageName}>
          {showedPageName}
        </Typography>
      </Toolbar>
      <div className={classes.spinnerHolder}>{loading && <Spinner />}</div>
    </AppBar>
  );
};
