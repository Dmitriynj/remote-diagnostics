import React, { useEffect } from "react";
import { Button, Media } from "react-bootstrap";
import { List, ListRowProps, ListRowRenderer } from "react-virtualized";
import "./Vehicles.css";

const vehicles = [
  {
    id: 1,
    mark: "some 1",
    model: "some model",
    vin: "erhdrytkt",
    production_year: "safda",
    image:
      "https://cdn.euroncap.com/media/30740/volkswagen-polo-359-235.jpg?mode=crop&width=359&height=235",
  },
  {
    id: 2,
    mark: "some 1",
    model: "some model",
    vin: "erhdrytkt",
    production_year: "safda",
    image:
      "https://cdn.euroncap.com/media/30740/volkswagen-polo-359-235.jpg?mode=crop&width=359&height=235",
  },
  {
    id: 3,
    mark: "some 1",
    model: "some model",
    vin: "erhdrytkt",
    production_year: "safda",
    image:
      "https://cdn.euroncap.com/media/30740/volkswagen-polo-359-235.jpg?mode=crop&width=359&height=235",
  },
  {
    id: 4,
    mark: "some 1",
    model: "some model",
    vin: "erhdrytkt",
    production_year: "safda",
    image:
      "https://cdn.euroncap.com/media/30740/volkswagen-polo-359-235.jpg?mode=crop&width=359&height=235",
  },
  {
    id: 5,
    mark: "some 1",
    model: "some model",
    vin: "erhdrytkt",
    production_year: "safda",
    image:
      "https://cdn.euroncap.com/media/30740/volkswagen-polo-359-235.jpg?mode=crop&width=359&height=235",
  },
];

export const Vehicles = () => {
  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    // isScrolling, // The List is currently being scrolled
    // isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }: ListRowProps) {
    return (
      <div key={key} style={style}>
        {vehicles[index]}
      </div>
    );
  }
  return (
    <List
      width={300}
      height={300}
      rowCount={vehicles.length}
      rowHeight={20}
      rowRenderer={rowRenderer}
    />
  );
};
