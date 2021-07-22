import React from "react";
import { Switch } from "react-router-dom";
import { Counter } from "../features/counter/Counter";
import "./App.css";
import AppHeader from "./AppHeader";
import AppRouter from "./AppRouter";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div style={{ padding: "50px 50px", margin: "0px auto" }}>
        <Switch>{AppRouter}</Switch>
      </div>
    </div>
  );
}

export default App;
