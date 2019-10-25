import React from "react";
import Login from "./login.jsx";
import SearchForm from "./searchform.jsx";
import { Link, hashHistory } from "react-router";
import Alert from "react-s-alert";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    if (window.localStorage.getItem("userToken") == null) {
      hashHistory.push("login");
    }
  }

  handleLogout() {
    window.localStorage.setItem("userToken", "");
    Alert.success("You've been successfully logged out");
  }

  render() {
    var that = this;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          {window.localStorage.getItem("userToken") ? (
            <div className="navbar">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link
                to="home"
                className="navbar-brand"
                aria-label="homepage link"
              >
                <img
                  class="navbar-brand"
                  src="../assets/logo.png"
                  width="181"
                  height="166"
                  alt="VPIA logo"
                  aria-label="VPIA logo"
                ></img>
              </Link>
            </div>
          ) : (
            <div class="container-fluid">
              <nav className="navbar navbar-light">
                <div class="navbar-brand">
                  <Link
                    to="landing"
                    className="navbar-brand"
                    aria-label="homepage link"
                  >
                    <img
                      class="navbar-brand"
                      src="../assets/logo.png"
                      width="181"
                      height="166"
                      alt="VPIA logo"
                      aria-label="VPIA logo"
                    ></img>
                  </Link>
                </div>
                <div className="container-fluid navbar-right">
                  <button
                    type="button"
                    className="btn btn-outline-success"
                  >
                    <Link to="/user_signup">Join Now!</Link>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                  >
                    <Link to="login">Sign In</Link>
                  </button>
                </div>
              </nav>
            </div>
          )}
          {window.localStorage.getItem("userToken") ? (
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav navbar-right">
                {window.localStorage.getItem("userId") == 1 ? (
                  <li>
                    <Link to="admin" className="">
                      Admin
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <Link to="article/new" className="">
                    New Article
                  </Link>
                </li>
                <li>
                  <a href="" onClick={this.handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div />
          )}
        </nav>
        <div className="content container">{that.props.children}</div>
        {/* @Mordax - this doesn't centre with the rest of the content container, fix later. */}
        {/* <div className="footer center-align">
          <div className="help-block">
            Powered by <a href="http://matterwiki.com">Matterwiki</a>
          </div>
        </div> */}
        <Alert stack={{ limit: 3 }} position="bottom" />
      </div>
    );
  }
}

export default App;
