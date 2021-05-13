const vehicles = require("./vehicles");
const auth = require("./auth");

module.exports = (app) => {
  app.use("/vehicles", vehicles);
  app.use("/auth", auth);
  // etc..
};
