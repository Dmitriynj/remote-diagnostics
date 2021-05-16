import React, { useEffect } from "react";
import { useAppState } from "../helpers/use_app_state";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

export const AlertHolder = () => {
  const { alert, setAlert } = useAppState();

  useEffect(() => {
    if (alert) {
      setTimeout(() => setAlert(null), 5000);
    }
  }, [alert, setAlert]);

  if (alert?.message) {
    return (
      <Snackbar open={true} onClose={() => setAlert(null)}>
        <Alert onClose={() => setAlert(null)} severity={alert.type}>
          {alert.message}
          {alert.status && ` Код ошибки: ${alert.status}`}
        </Alert>
      </Snackbar>
    );
  }
  return null;
};
