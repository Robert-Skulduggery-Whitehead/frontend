import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";
import Layout from "./HUD/layout/layout";
import Controls from "./Controls/Controls";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Layout}></Route>
        <Route exact path="/controls" component={Controls}></Route>
      </Switch>
    </Router>
  );
}

export default App;
