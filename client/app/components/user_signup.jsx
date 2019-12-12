import React from "react";
import { hashHistory, Link } from "react-router";
//import Alert from "react-s-alert";
import Loader from "./loader.jsx";

class UserSignup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {
      email: "",
      password: ""
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

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
    var that = this;
    fetch("/users", myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
        } //Alert.error(response.error.message);
        else {
          //Alert.success("User generated");
          hashHistory.push("login");
        }
      });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit() {
    const { email, password } = this.state;
    alert(`Signed up with email: ${email} password: ${password}`);
  }

  render() {
    const { email, password } = this.state;
    const isEnabled = email.length > 0 && password.length > 0;

    return (
      <div id="fullpage" className="container-fluid">
        <div id="full-page" className="row">
          <div className="col-4 left-panel">
            <img
              src="../assets/logos/logo-white.png"
              width="auto"
              height="250px"
              alt="VPIA logo"
              aria-label="VPIA logo"
            />
            <div className="setup-form container">
              <div className="col-md-12 col-sm-12">
                <form onSubmit={this.handleSubmit}>
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
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                    />
                  </div>
                  <div className="col-sm-12 form-group">
                    <input
                      type="password"
                      className="form-control"
                      ref="user_password"
                      id="inputUserPassword"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                  </div>
                  <div className="col-sm-12">
                    <a
                      className="text-warning"
                      href="https://foundation.wikimedia.org/wiki/Terms_of_Use/en"
                    >
                      Terms and Conditions
                    </a>
                    <br />
                    <a
                      className="text-warning"
                      href="https://foundation.wikimedia.org/wiki/Privacy_policy"
                    >
                      Privacy Policy
                    </a>
                    <br />
                    <br />
                    <div className="text-white small">
                      We will be modifying our Terms and Conditions/Privacy
                      Policy to reflect our responsibilities in the very near
                      future. For now, we are mirroring Wikipedia's goals.
                    </div>
                    <br />
                  </div>
                  <div className="col-sm-12 form-group">
                    <button
                      onClick={this.handleSignUp}
                      disabled={!isEnabled}
                      className="btn btn-outline-light btn-block"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-8 BGimage image-fade">
            <img
              src="../assets/logos/logo.png"
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

export default UserSignup;
