/* --------------------------------------------------------------------------------------------------------------------------------------------
  This is the login page logic and functions relating to signing in.
*/
import React from "react";
import { hashHistory, Link } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import IntroCarousel from "./intro_carousel.jsx";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      hidden: true,
      password: ""
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // On load, if there is a user token, get redirected to home.
  componentDidMount() {
    if (window.localStorage.getItem("userToken")) {
      hashHistory.push("landing");
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Authenticate the login input
  handleSubmit(e) {
    e.preventDefault();
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;

    let myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    let myInit = {
      method: "POST",
      headers: myHeaders,
      body:
        "email=" +
        encodeURIComponent(email) +
        "&password=" +
        encodeURIComponent(password)
    };

    let that = this;

    fetch(`${process.env.USERSERVICE}/api/authenticate`, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          StatusAlertService.showError(response.error.message);
        } else {
          window.localStorage.setItem("userToken", response.data.token);
          window.localStorage.setItem("admin", response.data.user.admin);
          window.localStorage.setItem("user_id", response.data.user.id);
          window.localStorage.setItem("userEmail", response.data.user.email);
          hashHistory.push("welcome");
          StatusAlertService.showSuccess("You are now logged in");
        }
      });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Render the log in page.
  render() {
    return (
      <div className="fullpage container-fluid">
        <StatusAlert />
        <div className="full-page row">
          <div className="col-lg-8 BGimage image-fade">
            <div className="image-tint-dark"></div>
            <IntroCarousel />
          </div>
          <div className="col-lg-4 right-panel">
            <img
              src="../assets/images/logo.png"
              width="124px"
              height="auto"
              alt="VPIA logo"
              aria-label="VPIA logo"
            />
            <div className="container login-box row">
              <div className="col-md-12 col-sm-12">
                <div className="col-sm-12">
                  <h1 className="welcome-message">
                    Aaniin/Tanisi/Hello Welcome back!
                  </h1>
                </div>
                <form className="col-sm-12">
                  <div className="form-group login-form">
                    <input
                      className="form-control"
                      id="inputEmail"
                      type="email"
                      placeholder="Email"
                      aria-label="Email"
                    />
                  </div>
                  <div className="form-group input-group login-form">
                    <input
                      className="form-control"
                      id="inputPassword"
                      type="password"
                      placeholder="Password"
                      aria-label="Password"
                      type={this.state.hidden ? "password" : "text"}
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary append-light "
                        aria-label="show password"
                        onClick={this.toggleShow}
                      >
                        Show
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      onClick={this.handleSubmit}
                      className="btn btn-primary btn-block mt-5"
                    >
                      Sign in
                    </button>
                    <Link to="/user_signup" className="none-deco">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-block join-btn"
                      >
                        New to VPIA? Join Now!
                      </button>
                    </Link>
                    <Link
                      to="/forgot_password"
                      aria-label="Go to home page"
                      className="none-deco"
                    >
                      <p className="green-text mt-4 btn btn-light">
                        Forgot Password?
                      </p>
                    </Link>
                  </div>
                  <Link
                    to="landing"
                    aria-label="Go to home page"
                    className="none-deco"
                  >
                    <p className="font-italic text-sm-left return-text">
                      Return to homepage
                    </p>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
