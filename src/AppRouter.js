import React, { Component } from "react";
import {
  BrowserRouter as Router,
  //   Redirect,
  Route,
  Switch,
} from "react-router-dom";
import stagingScanCarton from "./components/stagingScanCarton";
import stagingPrintItem from "./components/stagingPrintItem";
import stagingBinSelection from "./components/stagingBinSelection";
import stagingItemScan from "./components/stagingItemScan";
import stagingItemSelection from "./components/stagingItemSelection";
import stagingConfirmation from "./components/stagingConfirmation";
import "./App.css";

export default class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/stagingPrintItem" component={stagingPrintItem} />
          <Route path="/stagingBinSelection" component={stagingBinSelection} />
          <Route path="/stagingItemScan" component={stagingItemScan} />
          <Route path="/stagingItemSelection" component={stagingItemSelection} />
          <Route path="/stagingConfirmation" component={stagingConfirmation} />
          <Route path="/" component={stagingScanCarton} />
        </Switch>
      </Router>
    );
  }
}
