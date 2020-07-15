/* --------------------------------------------------------------------------------------------------------------------------------------------
  This is the login page logic and functions relating to signing in.
*/
import React from "react";
import { hashHistory, Link } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    fetch("/api/authenticate", myInit)
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
          window.localStorage.setItem("userEmail", response.data.user.token);
          hashHistory.push("landing");
          StatusAlertService.showSuccess("You are now logged in");
        }
      });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Render the log in page.
  render() {
    return (
      <div id="fullpage" className="container-fluid">
        <StatusAlert />
        <div id="full-page" className="row">
          <div className="col-lg-4 left-panel">
            <img
              src="../assets/images/logo-white.png"
              width="auto"
              height="250px"
              alt="VPIA logo"
              aria-label="VPIA logo"
            />
            <div className="container login-box row">
              <div className="col-md-12 col-sm-12">
                <form>
                  <div className="col-sm-12 form-group">
                    <input
                      className="form-control"
                      id="inputEmail"
                      type="email"
                      placeholder="Email"
                      aria-label="Email"
                    />
                  </div>
                  <div className="col-sm-12 form-group">
                    <input
                      className="form-control"
                      id="inputPassword"
                      type="password"
                      placeholder="Password"
                      aria-label="Password"
                    />
                  </div>
                  <div className="col-sm-12 form-group">
                    <button
                      onClick={this.handleSubmit}
                      className="btn btn-primary btn-block"
                    >
                      Sign in
                    </button>
                  </div>
                  <div className="col-sm-12 form-group">
                    <button
                      type="button"
                      className="btn btn-outline-light btn-block"
                    >
                      <Link to="/user_signup" className="none-deco">
                        New to VPIA? Join Now!
                      </Link>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-8 BGimage image-fade hidden-lg-down">
            <img
              src="../assets/images/logo.png"
              width="auto"
              height="400px"
              alt="VPIA logo"
              aria-label="VPIA logo"
              id="logo-bottom-right"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
