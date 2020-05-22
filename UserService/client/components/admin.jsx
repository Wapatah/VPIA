/* --------------------------------------------------------------------------------------------------------------------------------------------
  The Admin component - checking if user is admin and providing admin endpoints to use
  Note: With the update of Bootstrap, this component doesn't really work at the moment.
  There will most likely be an overhaul of the Admin .
*/
import React from "react";
import { Link } from "react-router";
import Loader from "../../../client/components/helpers/loader.jsx";
import StatusAlert, { StatusAlertService } from "react-status-alert";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    // Add Admin only functions to component
    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = {
      loading_users: true,
      users: [],
      error: ""
    };
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  On initial load, pull in all users
*/
  componentDidMount() {
    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    var myInit = { method: "GET", headers: myHeaders };
    var that = this;

    fetch("/api/users", myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          StatusAlertService.showError(response.error.message);
        } else {
          that.setState({ users: response.data, loading_users: false });
        }
      });
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  addUser() - Take admin input for user and create a new user.
*/
  addUser() {
    var user = {
      name: encodeURIComponent(this.refs.user_name.value),
      about: encodeURIComponent(this.refs.user_about.value),
      email: encodeURIComponent(this.refs.user_email.value),
      password: encodeURIComponent(this.refs.user_password.value)
    };

    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
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

    fetch("/api/users/", myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          StatusAlertService.showError(response.error.message);
        } else {
          $("#addUser").modal("hide");
          var users = that.state.users;
          users.push(response.data);
          that.setState({ users: users });
          StatusAlertService.showSuccess("User has been added");
        }
      });
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  deleteUser() - Remove user from list of users.
*/
  deleteUser(id, e) {
    e.preventDefault();

    var del = confirm(
      "Deleting the user will move all of his/her articles to the Admin. Are you sure?"
    );

    if (del == true) {
      var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem("userToken")
      });

      var myInit = { method: "DELETE", headers: myHeaders, body: "id=" + id };
      var that = this;

      fetch("/api/users/", myInit)
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
          if (response.error.error) {
            StatusAlertService.showError(response.error.message);
          } else {
            users = that.state.users;
            var users = $.grep(users, function(e) {
              return e.id != id;
            });
            that.setState({ users: users });
            StatusAlertService.showSuccess("User has been deleted");
          }
        });
    }
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  This renders an Admin only component to delete users
*/
  render() {
    if (this.state.loading_users && this.state.loading_users) return <Loader />;
    else
      return (
        <div>
          <StatusAlert />
          <div className="row container">
            <div className="col-md-6">
              <button
                className="btn btn-default"
                data-toggle="modal"
                data-target="#addUser"
              >
                Add User
              </button>
              <br />
              <br />
              <div className="list-group bordered-scroll-box">
                {this.state.users.map(user => (
                  <div key={user.id} href="#" className="list-group-item">
                    {user.admin != true ? (
                      <span className="pull-right">
                        <Link
                          to={"user/edit/" + user.id}
                          className="btn btn-default"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-default"
                          type="button"
                          onClick={e => this.deleteUser(user.id, e)}
                        >
                          Delete
                        </button>
                      </span>
                    ) : (
                      ""
                    )}
                    <h4 className="list-group-item-heading">{user.name}</h4>
                    <p className="list-group-item-text">{user.about}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="modal modal-fullscreen fade"
            id="addUser"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <center>
                    <div className="row">
                      <div className="col-md-6 col-sd-12">
                        <h1>
                          <b>Add User</b>
                        </h1>
                        <br />
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
                              onClick={this.addUser}
                              className="btn btn-default btn-block btn-lg"
                            >
                              Add User
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Admin;
