import React, { useMemo, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Emitter } from "./Emitter";
import { AxiosError } from "axios";
import { handleError } from "./errorHandler";
import { Color } from "@material-ui/lab/Alert/Alert";
import { instance } from "./axios_defaults";

export interface AppContext {
  alert: {
    message: string;
    type: Color | undefined;
    error?: Error;
    status?: number;
  } | null;
  loading: boolean;
  user: {
    email: string;
    accessToken: string;
    isAuth: boolean;
    avatar: string;
    role: string;
  };
  pageName: string;
  sidebarOpened: boolean;
  setLoading: (val: boolean) => void;
  setAlert: (val: AppContext["alert"]) => void;
  setUser: (val: AppContext["user"]) => void;
  setSidebarOpened: (val: AppContext["sidebarOpened"]) => void;
}

export const initialContext = {
  alert: null,
  loading: false,
  user: {
    email: "",
    accessToken: "",
    isAuth: false,
    avatar: "",
    role: "",
  },
  pageName: "Автопарк",
  sidebarOpened: false,
  setLoading: () => {},
  setAlert: () => {},
  setUser: () => {},
  setSidebarOpened: () => {},
};

const AppStateContext = createContext<AppContext>(initialContext);

const AppStateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(initialContext.loading);
  const [alert, setAlert] = useState(initialContext.alert);
  const [user, setUser] = useState(initialContext.user);
  const [sidebarOpened, setSidebarOpened] = useState(
    initialContext.sidebarOpened
  );

  useEffect(() => {
    Emitter.on("LOADING", (val: boolean) => setLoading(val));
    Emitter.on("ERROR", (error: AxiosError) => {
      const errorEntry = handleError(error) as any;
      if (errorEntry.status === 403 || errorEntry.status === 401) {
        setUser(initialContext.user);
      }
      setAlert(errorEntry);
    });

    try {
      const userFromLS = localStorage.getItem("user");
      if (userFromLS) {
        const parsedUser = JSON.parse(userFromLS);
        console.log("parsedUser", parsedUser);
        instance.defaults.headers.common["Authorization"] =
          parsedUser.accessToken;
        setUser(parsedUser);
      }
    } catch (e) {}

    return () => {
      Emitter.off("LOADING");
      Emitter.off("ERROR");
    };
  }, []);

  const value = useMemo(
    () =>
      ({
        alert,
        loading,
        user,
        sidebarOpened,
        setAlert,
        setUser: (user: AppContext["user"]) => {
          instance.defaults.headers.common["Authorization"] = user.accessToken;
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        },
        setSidebarOpened,
      } as AppContext),
    [user, loading, alert, sidebarOpened]
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

AppStateContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { AppStateContextProvider, AppStateContext };
