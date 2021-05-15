import React from "react";
// import { Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const tabs = [
  { label: "Текущее состояние", icon: "pi pi-fw pi-home" },
  { label: "Местоположение", icon: "pi pi-fw pi-calendar" },
  { label: "Отчетная история", icon: "pi pi-fw pi-pencil" },
];

export const VehicleTabs = () => {
  return (
    <div></div>
    // <Nav fill variant="tabs" defaultActiveKey="/home">
    //   <Nav.Item>
    //     <Nav.Link eventKey="link-1">Active</Nav.Link>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <Nav.Link eventKey="link-2">Link</Nav.Link>
    //   </Nav.Item>
    // </Nav>
  );
};
