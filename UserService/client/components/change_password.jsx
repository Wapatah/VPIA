/* --------------------------------------------------------------------------------------------------------------------------------------------
  Potentially depreciated? Admin is currently not working. But the logic could be used for User settings.
*/
import React from "react";
import { hashHistory } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import Loader from "./helpers/loader.jsx";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.editPassword = this.editPassword.bind(this);
    this.handleChange = this.onInputChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.state = {
      loading: true,
      hidden: true,
      password: ""
    };
  }

  // On load, GET ONE user by id.
  async componentDidMount() {
    this.setState({ loading: false });
  }

  // Edit User information
  async editPassword(e) {
    e.preventDefault();
    let password = this.state.password;

    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });

    let request = {
      method: "PUT",
      headers: headers,
      body:
        "&password=" +
        encodeURIComponent(password) +
        "&id=" +
        window.localStorage.getItem("user_id")
    };

    const res = await fetch(
      `${process.env.USERSERVICE}/api/users/password`,
      request
    );
    const json = await res.json();
    if (json.error.error) {
      StatusAlertService.showError(json.error.message);
    } else {
      StatusAlertService.showSuccess("Password has been changed");
    }
    hashHistory.push("user");
  }

  // Set variable to new input
  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // Toggle Password to show/hide
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  // Render user editing page
  render() {
    if (this.state.loading) return <Loader />;
    else {
      return (
        <div>
          <StatusAlert />
          <div className="row">
            <div className="col-md-12 col-sd-12">
              <h1>
                <b>Change Password </b>
              </h1>
              <br />
              <div className="col-sm-12 form-group">
                <div class="input-group">
                  <input
                    name="password"
                    type={this.state.hidden ? "password" : "text"}
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onInputChange}
                  />
                  <button
                    className="btn btn-text append-light"
                    type="button"
                    aria-label="show password"
                    onClick={this.toggleShow}
                  >
                    {this.state.hidden ? (
                      <i className="fa fa-eye-slash"></i>
                    ) : (
                      <i className="fa fa-eye"></i>
                    )}
                  </button>
                </div>
              </div>
              <div className="col-sm-12 form-group">
                <button
                  onClick={this.editPassword}
                  className="btn btn-default btn-block btn-lg"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ChangePassword;
