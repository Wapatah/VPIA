import React from "react";
import { hashHistory, Link } from "react-router";
//import Alert from "react-s-alert";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (window.localStorage.getItem("userToken")) {
      hashHistory.push("home");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    var myInit = {
      method: "POST",
      headers: myHeaders,
      body:
        "email=" +
        encodeURIComponent(email) +
        "&password=" +
        encodeURIComponent(password)
    };
    var that = this;
    fetch("/api/authenticate", myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
        } //Alert.error(response.error.message);
        else {
          window.localStorage.setItem("userToken", response.data.token);
          window.localStorage.setItem("admin", response.data.user.admin);
          window.localStorage.setItem("user_id", response.data.user.id);
          window.localStorage.setItem("userEmail", response.data.user.token);
          hashHistory.push("landing");
          //Alert.success("You are now logged in");
        }
      });
  }

  render() {
    return (
      <div id="fullpage" className="container-fluid">
        <div className="row">
          <div className="col-4 left-panel">
            <img
              src="../assets/logos/logo-white.png"
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
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Email"
                      aria-label="Email"
                    />
                  </div>
                  <div className="col-sm-12 form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
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
          <div className="col-8">
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

export default Login;
