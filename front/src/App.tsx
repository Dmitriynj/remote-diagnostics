import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyRouter from "./components/MyRouter";
import { AppStateContextProvider } from "./helpers/AppContext";

function App() {
  return (
    <div className="App">
      <AppStateContextProvider>
        <MyRouter />
      </AppStateContextProvider>
    </div>
  );
}

export default App;
