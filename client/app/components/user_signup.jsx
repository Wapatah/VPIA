import React from "react";
import { hashHistory, Link } from "react-router";
import Alert from "react-s-alert";
import Loader from "./loader.jsx";

class UserSignup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(){
    var user = {
      name: encodeURIComponent(this.refs.user_name.value),
      about: encodeURIComponent(this.refs.user_about.value),
      email: encodeURIComponent(this.refs.user_email.value),
      password: encodeURIComponent(this.refs.user_password.value)
    }
    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
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
        if (response.error.error) Alert.error(response.error.message);
        else {
          Alert.success("User generated");
          hashHistory.push("login");
        }
      }); 
  }

  render() {
    return (
      <div className=" setup-form container">
        <div className="row">
          <div className="col-md-6">
            <h1>
              <b>Welcome,</b>
            </h1>
            <h3>to the Virtual Platform for Indigenous Art</h3>
            <br />
            <h4>
              This platform was made for discussion.
            </h4>
            <br />
          </div>
          <div className="col-md-6">
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
                  className="btn btn-default btn-block btn-lg"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSignup;