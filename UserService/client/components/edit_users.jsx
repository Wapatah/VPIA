/* --------------------------------------------------------------------------------------------------------------------------------------------
  Potentially depreciated? Admin is currently not working. But the logic could be used for User settings.
*/
import React from "react";
import { hashHistory } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import Loader from "./helpers/loader.jsx";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.editUser = this.editUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      loading: true,
      name: "",
      about: "",
      email: "",
      password: ""
    };
  }

  // On load, GET ONE user by id.
  componentDidMount() {
    let myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    let myInit = { method: "GET", headers: myHeaders };
    let that = this;

    fetch("/api/users/" + this.props.params.user_id, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          StatusAlertService.showError(response.error.message);
        } else {
          that.setState({
            name: response.data.name,
            about: response.data.about,
            email: response.data.email,
            loading: false
          });
        }
      });
  }

  // Edit User information
  editUser(e) {
    let user = {
      name: encodeURIComponent(this.refs.user_name.value),
      about: encodeURIComponent(this.refs.user_about.value),
      email: encodeURIComponent(this.refs.user_email.value),
      password: encodeURIComponent(this.refs.user_password.value),
      id: encodeURIComponent(this.props.params.user_id)
    };

    let myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });

    let myInit = {
      method: "PUT",
      headers: myHeaders,
      body:
        "name=" +
        user.name +
        "&about=" +
        user.about +
        "&email=" +
        user.email +
        "&password=" +
        user.password +
        "&id=" +
        user.id
    };

    fetch("/api/users/", myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          StatusAlertService.showError(response.error.message);
        } else {
          StatusAlertService.showSuccess("User has been edited");
          hashHistory.push("admin");
        }
      });
  }

  // Set variable to new input
  handleChange() {
    this.setState({
      name: this.refs.user_name.value,
      about: this.refs.user_about.value,
      email: this.refs.user_email.value,
      password: this.refs.user_password.value
    });
  }

  // Render user editing page
  render() {
    if (this.state.loading) return <Loader />;
    else
      return (
        <div>
          <StatusAlert />
          <div className="row">
            <div className="col-md-12 col-sd-12">
              <h1>
                <b>Update User</b>
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
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-sm-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    ref="user_about"
                    id="inputUserAbout"
                    placeholder="About"
                    value={this.state.about}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-sm-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    ref="user_email"
                    id="inputUserName"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-sm-12 form-group">
                  <input
                    type="password"
                    className="form-control"
                    ref="user_password"
                    id="inputUserName"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-sm-12 form-group">
                  <button
                    onClick={this.editUser}
                    className="btn btn-default btn-block btn-lg"
                  >
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
  }
}

export default EditUser;
