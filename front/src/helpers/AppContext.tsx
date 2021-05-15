import React, { useMemo, createContext, useState } from "react";
import PropTypes from "prop-types";

interface AppContext {
  error: {
    message: string;
    error?: Error;
  } | null;
  loading: boolean;
  user: {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
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
    id: "",
    email: "",
    accessToken: "",
    refreshToken: "",
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

  const value = useMemo(
    () =>
      ({
        error,
        loading,
        user,
        setLoading,
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
