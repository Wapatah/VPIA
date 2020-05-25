/* --------------------------------------------------------------------------------------------------------------------------------------------
  Setup page for the initial admin logic. Will probably have to be cleaned up to reduce amount of code
*/
import React from "react";
import { hashHistory } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";

class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Creates admin object and sends a user POST request
  handleSignUp() {
    var user = {
      name: encodeURIComponent(this.refs.user_name.value),
      about: encodeURIComponent(this.refs.user_about.value),
      email: encodeURIComponent(this.refs.user_email.value),
      password: encodeURIComponent(this.refs.user_password.value)
    };

    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    var myInit = {
      method: "POST",
      headers: myHeaders,
      body:
        "name=" +
        user.name +
        "&about=" +
        user.about +
        "&email=" +
        user.email +
        "&password=" +
        user.password
    };

    fetch("/setup", myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          StatusAlertService.showError(response.error.message);
        } else {
          hashHistory.push("login");
          StatusAlertService.showSuccess("Admin user generated");
        }
      });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Render the admin sign up page
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
            <div className="setup-form container">
              <div className="col-md-12 col-sm-12">
                <form>
                  <div className="col-sm-12 form-group">
                    <input
                      type="text"
                      className="form-control"
                      ref="user_name"
                      id="inputUserName"
                      placeholder="Name"
                    />
                  </div>
                  <div className="col-sm-12 form-group">
                    <input
                      type="text"
                      className="form-control"
                      ref="user_about"
                      id="inputUserAbout"
                      placeholder="About"
                    />
                  </div>
                  <div className="col-sm-12 form-group">
                    <input
                      type="email"
                      className="form-control"
                      ref="user_email"
                      id="inputUserEmail"
                      placeholder="Email"
                    />
                  </div>
                  <div className="col-sm-12 form-group">
                    <input
                      type="password"
                      className="form-control"
                      ref="user_password"
                      id="inputUserPassword"
                      placeholder="Password"
                    />
                  </div>
                  <div className="col-sm-12 form-group">
                    <button
                      onClick={this.handleSignUp}
                      className="btn btn-outline-light btn-block"
                    >
                      Setup My Admin Account
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

export default Setup;
