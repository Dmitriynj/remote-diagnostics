import React from "react";
// import { Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppState } from "../helpers/use_app_state";

const PAGE_NAME: PageName = {
  "/login": "Вход в систему",
  "/vehicles": "Весь автопарк",
};

interface PageName {
  [key: string]: string;
}

export const PageHeader = () => {
  const location = useLocation();
  const { loading } = useAppState();

  return (
    <div></div>
    // <Navbar sticky="top" expand="lg" bg="light">
    //   <Navbar.Brand href="#">{PAGE_NAME[location.pathname || ""]}</Navbar.Brand>
    //   {loading && (
    //     <div className="spinner-border" role="status">
    //       <span className="sr-only">Loading...</span>
    //     </div>
    //   )}
    // </Navbar>
  );
};
