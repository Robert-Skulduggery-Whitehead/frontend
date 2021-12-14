import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Layout from "./HUD/layout/layout";
import Controls from "./Controls/Controls";
import AddPlayer from "./Controls/AddPlayers";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Controls}></Route>
        <Route exact path="/hud" component={Layout}></Route>
        <Route exact path="/players" component={AddPlayer}></Route>
      </Switch>
    </Router>
  );
}

export default App;
