import React, { useMemo, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Emitter } from "./Emitter";
import { AxiosError } from "axios";
import { handleError } from "./errorHandler";

export interface AppContext {
  error: {
    message: string;
    error?: Error;
  } | null;
  loading: boolean;
  user: {
    email: string;
  };
  pageName: string;
  setLoading: (val: boolean) => void;
  setError: (val: AppContext["error"]) => void;
  setUser: (val: AppContext["user"]) => void;
}

const initialContext = {
  error: null,
  loading: false,
  user: {
    email: "",
  },
  pageName: "Автопарк",
  setLoading: () => {},
  setError: () => {},
  setUser: () => {},
};

const AppStateContext = createContext<AppContext>(initialContext);

const AppStateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(initialContext.loading);
  const [error, setError] = useState(initialContext.error);
  const [user, setUser] = useState(initialContext.user);

  useEffect(() => {
    Emitter.on("LOADING", (val: boolean) => setLoading(val));
    Emitter.on("ERROR", (error: AxiosError) =>
      setError(handleError(error) as any)
    );

    return () => {
      Emitter.off("LOADING");
      Emitter.off("ERROR");
    };
  }, []);

  const value = useMemo(
    () =>
      ({
        error,
        loading,
        user,
        setError,
        setUser,
      } as AppContext),
    [user, loading, error]
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
