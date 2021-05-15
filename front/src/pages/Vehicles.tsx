import React, { useEffect } from "react";
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
  const itemTemplate = (item: any) => {
    return (
      <div className="list-item">
        <div className="vehicle-entry">
          <img width={64} height={64} className="mr-3" src={item.image} />
          <h4>{item.model}</h4>
        </div>
        <div style={{ paddingRight: 15 }}>
          <i className="pi pi-arrow-right" style={{ fontSize: "1.4em" }}></i>
        </div>
      </div>
    );
  };

  return (
    <div></div>
    // <DataScroller
    //   value={vehicles}
    //   itemTemplate={itemTemplate}
    //   rows={5}
    //   buffer={0.4}
    // />
  );
};
