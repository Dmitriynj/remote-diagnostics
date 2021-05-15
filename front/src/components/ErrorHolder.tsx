import React, { useEffect, useRef } from "react";
// import { Alert } from "react-bootstrap";
import { useAppState } from "../helpers/use_app_state";

export const ErrorHolder = () => {
  const { error, setError } = useAppState();

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 3000);
    }
  }, [error, setError]);

  if (error?.message) {
    return (
      <div>
        {/* <Alert variant="danger" onClose={() => setError(null)} dismissible>
          <p>{error.message}</p>
        </Alert> */}
      </div>
    );
  }
  return <div></div>;
};
