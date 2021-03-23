/* --------------------------------------------------------------------------------------------------------------------------------------------
  This is the main App container component along with the main headers and footer.
*/
import React from "react";
import { Link, hashHistory } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import MainNav from "./main_nav.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  Onload, If the user is not signed in, forcibly redirect them to the landing page.
*/
  componentWillMount() {
    if (window.localStorage.getItem("userToken") == null) {
      hashHistory.push("landing");
    }
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  handleLogout() - Clears all localstorage variables on logout.
*/
  handleLogout() {
    window.localStorage.removeItem("userToken");
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("userEmail");
    window.localStorage.removeItem("admin");

    StatusAlertService.showSuccess("You've been successfully logged out");
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  Displays headers, footers, checks if user is admin and gives link to Admin component.
*/
  render() {
    let that = this;
    return (
      <div>
        <StatusAlert />
        <nav className="navbar navbar-expand-lg navbar-dark mainheader">
          <div
            className="alert alert-light alert-dismissible fade show"
            role="alert"
          >
            This platform is in Perpetual Beta - meaning that the community is
            invited to give their voices to how the VPIA changes over time. If
            you identify any major bugs or would like to give your thoughts on
            the platform's function, please{" "}
            <a href="mailto:vpia@ocadu.ca">send us an email. </a>
            <code>
              For returning users, if you notice outdated content or unusual
              visuals, please forcibly refresh your browser.
            </code>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {window.localStorage.getItem("userToken") ? (
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          ) : (
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item px-2">
                    <Link to="user_signup" className="none-deco">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-round join-btn"
                        aria-label="Join now"
                      >
                        Join
                      </button>
                    </Link>
                  </li>
                  <li className="nav-item px-2">
                    <Link to="login" className="btn-text">
                      <button
                        type="button"
                        className="btn btn-primary btn-round sign-in-btn"
                        aria-label="Sign in"
                      >
                        Sign In
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {window.localStorage.getItem("userToken") ? (
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                {window.localStorage.getItem("admin") === "1" ? (
                  <li className="nav-item px-2">
                    <Link to="admin" className="btn-text">
                      <button
                        type="button"
                        className="btn btn-secondary btn-round"
                      >
                        Admin
                      </button>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {window.localStorage.getItem("admin") === "1" ? (
                  <li className="nav-item px-2">
                    <Link to="article/new" className="btn-text">
                      <button
                        type="button"
                        className="btn btn-secondary btn-round"
                      >
                        New Article
                      </button>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                <li className="nav-item px-2">
                  <Link to="user" className="btn-text">
                    <button
                      type="button"
                      className="btn btn-secondary btn-round"
                    >
                      User
                    </button>
                  </Link>
                </li>
                <li className="nav-item px-2">
                  <a href="" className="btn-text" onClick={this.handleLogout}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-round"
                    >
                      Logout
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div />
          )}
        </nav>
        <MainNav />
        <div>{that.props.children}</div>
        <footer aria-label="Footer" role="contentinfo">
          <div className="footer-darkgrey">
            <div className="container bottom_border">
              <div id="full-page" className="row justify-content-between">
                <div className="col-md-5">
                  <div className="row">
                    <div className="col-lg-3">
                      <img
                        id="footer-logo"
                        src="../assets/images/VPIA-logo-white.png"
                        alt="VPIA logo"
                        aria-label="VPIA logo"
                      ></img>
                    </div>

                    <div
                      className="col-lg-9 align-self-center footer-list"
                      aria-label="Additional links"
                    >
                      <ul className="footer_ul">
                        <li>
                          <Link to="about">Acceptable Use Policy</Link>
                        </li>

                        <li>
                          <Link to="agreement">Community Member Agreement</Link>
                        </li>

                        <li>
                          <Link to="aup">Acceptable Use Policy</Link>
                        </li>

                        <li>
                          <Link to="contact">Contact Us</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3">
                  <div
                    className="social-icons"
                    aria-label="VPIA social media links"
                  >
                    <ul className="social-network">
                      <li>
                        <a
                          href="https://www.youtube.com/channel/UCkj-suSgF-SrDjBJq8-za6w/"
                          aria-label="Youtube"
                        >
                          <i className="fa fa-youtube"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" aria-label="Twitter">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" aria-label="Instagram">
                          <i className="fa fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://wapatah.com/" aria-label="Website">
                          <i className="fa fa-globe"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-lightgrey" aria-label="Partnership logos">
            <div className="container bottom_border">
              <div className="row">
                <div className="col col-lg">
                  <p className="acknowledge-text">
                    We acknowledge the support of the Canada Council for the
                    Arts.
                  </p>
                  <img
                    src="../assets/images/CCA_RGB_white_e.png"
                    alt="CCA logo"
                    height="33"
                    aria-label="CCA logo"
                  />
                </div>
                <div className="col col-lg">
                  <img
                    src="../assets/images/Wapatah-logo-white.png"
                    alt="Wapatah logo"
                    height="60"
                    aria-label="Wapatah logo"
                  />
                </div>
                <div className="col col-lg">
                  <img
                    src="../assets/images/CFI-logo.png"
                    alt="CFI logo"
                    height="70"
                    aria-label="CFI logo"
                  />
                </div>
                <div className="col col-lg">
                  <img
                    src="../assets/images/Onsite-logo.png"
                    alt="Onsite logo"
                    height="60"
                    aria-label="Onsite logo"
                  />
                </div>
                <div className="col col-lg">
                  <img
                    src="../assets/images/OCAD-University-Logo.png"
                    alt="OCAD logo"
                    height="70"
                    aria-label="OCAD logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
