import moment from "moment";
import React from "react";
import "./App.css";
import MyRouter from "./components/MyRouter";
import { AppStateContextProvider } from "./helpers/AppContext";
import { initDefaults } from "./helpers/axios_defaults";

moment.locale("ru");
initDefaults();

function App() {
  return (
    <AppStateContextProvider>
      <MyRouter />
    </AppStateContextProvider>
  );
}

export default App;
