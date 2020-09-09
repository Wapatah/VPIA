import React from "react";
import { Route } from "react-router";
import { BrowserRouter as Router, Switch } from "react-router-dom";

// --------------------------------------------------------------------------------------------------------------------------------------------
// Import all components for navigation
import ArticleHistory from "./history.jsx";
// --------------------------------------------------------------------------------------------------------------------------------------------
// Build a route path and limit access to certain pages
export default function() {
  return (
    <Switch>
      <Route path="/">
        <Route
          path="article/history/:articleId"
          component={ArticleHistory}
        ></Route>
      </Route>
    </Switch>
  );
}
