import React from "react";
import { hashHistory, Link } from "react-router";
import Alert from "react-s-alert";

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
        if (response.error.error) Alert.error(response.error.message);
        else {
          window.localStorage.setItem("userToken", response.data.token);
          window.localStorage.setItem("user_id", response.data.user.id);
          window.localStorage.setItem("userEmail", response.data.user.token);
          hashHistory.push("home");
          Alert.success("You are now logged in");
        }
      });
  }

  render() {
    return (
      <div className="container login-box row">
        <div className="col-md-12 col-sm-12">
          <h1>Login</h1>
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
                className="btn btn-default btn-block btn-lg"
              >
                Log in
              </button>
            </div>
            <div className="col-sm-12 form-group">
              Don't have an account?
              <br />
              <Link to="/user_signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
