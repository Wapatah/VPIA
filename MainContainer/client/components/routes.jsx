/* --------------------------------------------------------------------------------------------------------------------------------------------
  Place all components to be navigated to as a page
  in this file.
*/

import React from "react";
import { Route, IndexRoute } from "react-router";
import { BrowserRouter as Router, Switch } from "react-router-dom";

// --------------------------------------------------------------------------------------------------------------------------------------------
// Import all components for navigation
import App from "./main/app.jsx";
import Home from "./main/home.jsx";
import Login from "../../../UserService/client/components/login.jsx";
import Article from "../../../WikiService/client/components/article.jsx";
import NewArticle from "../../../WikiService/client/components/new.jsx";
import EditArticle from "../../../WikiService/client/components/edit.jsx";
import InfoBox from "../../../WikiService/client/components/infobox.jsx";
import ArticleHistory from "../../../HistoryService/client/components/history.jsx";
import Institution from "../../../HistoryService/client/components/institution.jsx";
import Search from "../../../SearchService/client/components/search.jsx";
import Admin from "../../../UserService/client/components/admin.jsx";
import Setup from "../../../UserService/client/components/setup.jsx";
import EditUser from "../../../UserService/client/components/edit_users.jsx";
import UserSignup from "../../../UserService/client/components/user_signup.jsx";
import ForgotPassword from "../../../UserService/client/components/forgot_password.jsx";
import Welcome from "../../../UserService/client/components/welcome.jsx";
import Landing from "./main/landing.jsx";
import About from "./main/about.jsx";
import Results from "../../../SearchService/client/components/results.jsx";
import Artwork from "../../../SearchService/client/components/artwork.jsx";
import UserProfile from "../../../UserService/client/components/user_profile.jsx";

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
        <Route path="artwork" component={Artwork} />
        <Route path="article/new" component={NewArticle} />
        <Route path="article/edit/:articleId" component={EditArticle} />
        <Route path="article/history/:articleId" component={ArticleHistory} />
        <Route path="article/institution/:articleId" component={Institution} />
        <Route path="article/:articleId" component={Article} />
        <Route path="admin" component={Admin} />
        <Route path="user/edit/:user_id" component={EditUser} />
        <Route path="search" component={Search} />
        <Route path="about" component={About} />
        <Route path="user" component={UserProfile} />
      </Route>
      <Route path="login" component={Login} />
      <Route path="setup" component={Setup} />
      <Route path="user_signup" component={UserSignup} />
      <Route path="forgot_password" component={ForgotPassword} />
      <Route path="welcome" component={Welcome} />
    </Switch>
  );
}
