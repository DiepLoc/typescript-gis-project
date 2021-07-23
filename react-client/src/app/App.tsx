import { BackTop } from "antd";
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
      <div style={{ padding: "50px 50px", margin: "0px auto", maxWidth: 1000 }}>
        <Switch>{AppRouter}</Switch>
      </div>
      <BackTop />
    </div>
  );
}

export default App;
