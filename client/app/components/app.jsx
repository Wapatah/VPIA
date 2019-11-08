import React from "react";
import Login from "./login.jsx";
import SearchForm from "./searchform.jsx";
import { Link, hashHistory } from "react-router";
import Alert from "react-s-alert";
import MainNav from "./main_nav.jsx";

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
        <nav className="navbar navbar-expand-md mainheader">
          {window.localStorage.getItem("userToken") ? (
            <div className="navbar">
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
          ) : (
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item px-2">
                  <button
                    type="button"
                    className="btn btn-outline-light btn-round"
                  >
                    <Link to="user_signup" className="none-deco">
                      Join Now!
                    </Link>
                  </button>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn btn-secondary btn-round">
                    <Link to="login" className="btn-text">
                      Sign In
                    </Link>
                  </button>
                </li>
              </ul>
            </div>
          )}
          {window.localStorage.getItem("userToken") ? (
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ml-auto">
                {window.localStorage.getItem("userId") == 1 ? (
                  <li className="nav-item px-2">
                    <button
                      type="button"
                      className="btn btn-secondary btn-round"
                    >
                      <Link to="admin" className="btn-text">
                        Admin
                      </Link>
                    </button>
                  </li>
                ) : (
                  ""
                )}
                <li className="nav-item px-2">
                  <button type="button" className="btn btn-secondary btn-round">
                    <Link to="article/new" className="btn-text">
                      New Article
                    </Link>
                  </button>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn btn-secondary btn-round">
                    <a href="" className="btn-text" onClick={this.handleLogout}>
                      Logout
                    </a>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div />
          )}
        </nav>
        <MainNav />
        <div>{that.props.children}</div>
        <footer className="footer">
          <div className="container bottom_border">
            <div className="row">
              <div className="col col-lg-2">
                <img
                  src="../assets/logos/logo-white.png"
                  width="auto"
                  height="76"
                  alt="VPIA logo"
                  aria-label="VPIA logo"
                ></img>
              </div>
              <div className="col col-2">
                <ul className="footer_ul">
                  <li>
                    <a href="">Home</a>
                  </li>

                  <li>
                    <a href="">VPIA</a>
                  </li>

                  <li>
                    <a href="">Artwork</a>
                  </li>

                  <li>
                    <a href="">Contact</a>
                  </li>
                </ul>
              </div>
              <div className="col col-2">
                <ul className="footer_ul">
                  <li>
                    <a href="">Help</a>
                  </li>

                  <li>
                    <a href="">Terms</a>
                  </li>

                  <li>
                    <a href="">Tutorials</a>
                  </li>

                  <li>
                    <a href="">Careers</a>
                  </li>
                </ul>
              </div>

              <div className="col-sm-3 col-6 col">
                <div className="social-icons">
                  <ul className="social-network">
                    <li>
                      <a href="#">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-globe"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control email-form"
                    placeholder="Stay in touch"
                    ref="search"
                  />
                  <div className="input-group-append">
                    <button
                      type="submit"
                      className="btn btn-outline-secondary email-button"
                    >
                      <i className="fa fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col col-md-3 ml-md-auto">
                <img
                  src="../assets/logos/logo-ocad.png"
                  width="auto"
                  height="54"
                  className="float-right"
                  alt="VPIA logo"
                  aria-label="VPIA logo"
                ></img>
                <img
                  src="../assets/logos/logo-wapatah.png"
                  width="auto"
                  height="54"
                  className="float-right"
                  alt="VPIA logo"
                  aria-label="VPIA logo"
                ></img>
              </div>
            </div>
          </div>
        </footer>
        <Alert stack={{ limit: 3 }} position="bottom" />
      </div>
    );
  }
}

export default App;
