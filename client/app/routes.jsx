/* --------------------------------------------------------------------------------------------------------------------------------------------
  Place all components to be navigated to as a page
  in this file.
*/

import React from "react";
import { Route, IndexRoute } from "react-router";
import { BrowserRouter as Router, Switch } from "react-router-dom";

// --------------------------------------------------------------------------------------------------------------------------------------------
// Import all components for navigation
import App from "./components/app.jsx";
import Home from "./components/home.jsx";
import Login from "./components/login.jsx";
import Article from "./components/article.jsx";
import NewArticle from "./components/new.jsx";
import EditArticle from "./components/edit.jsx";
import ArticleHistory from "./components/history.jsx";
import Search from "./components/search.jsx";
import Admin from "./components/admin.jsx";
import Setup from "./components/setup.jsx";
import EditTopic from "./components/edit_topics.jsx";
import EditUser from "./components/edit_users.jsx";
import UserSignup from "./components/user_signup.jsx";
import Landing from "./components/landing.jsx";
import About from "./components/about.jsx";
import Results from "./components/results.jsx";

// --------------------------------------------------------------------------------------------------------------------------------------------
// Build a route path and limit access to certain pages
export default function() {
  return (
    <Switch>
      <Route path="/" component={App}>
        <IndexRoute component={Landing} />
        <Route path="home" component={Home} />
        <Route path="landing" component={Landing} />
        <Route path="results" component={Results} />
        <Route path="article/new" component={NewArticle} />
        <Route path="article/edit/:articleId" component={EditArticle} />
        <Route path="article/history/:articleId" component={ArticleHistory} />
        <Route path="article/:articleId" component={Article} />
        <Route path="admin" component={Admin} />
        <Route path="topic/edit/:topicId" component={EditTopic} />
        <Route path="user/edit/:user_id" component={EditUser} />
        <Route path="search" component={Search} />
        <Route path="about" component={About} />
      </Route>
      <Route path="login" component={Login} />
      <Route path="setup" component={Setup} />
      <Route path="user_signup" component={UserSignup} />
    </Switch>
  );
}
