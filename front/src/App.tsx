import React from "react";
import "./App.css";
import MyRouter from "./components/MyRouter";
import { AppStateContextProvider } from "./helpers/AppContext";
import { initDefaults } from "./helpers/axios_defaults";

initDefaults();

function App() {
  return (
    <AppStateContextProvider>
      <MyRouter />
    </AppStateContextProvider>
  );
}

export default App;
