/* --------------------------------------------------------------------------------------------------------------------------------------------
  User profile page
*/
import React from "react";
import { StatusAlertService } from "react-status-alert";
import Loader from "./helpers/loader.jsx";
import UserService from "../../config/config.json";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {}, loading: true };
  }

  async componentDidMount() {
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    let request = { method: "GET", headers: headers },
      that = this;

    try {
      const res = await fetch(
        `${UserService.URL}/api/users/` +
          window.localStorage.getItem("user_id"),
        request
      );
      const json = await res.json();
      that.setState({ user: json.data, loading: false });
    } catch (err) {
      StatusAlertService.showError(err.message);
    }
  }

  render() {
    let user = [];
    if (this.state.loading) return <Loader />;
    else if (this.state.user[0]) {
      user = this.state.user[0];
      return (
        <div className="profile container">
          <div className="row">
            <section className="col-lg-3">
              <div className="card shadow-sm">
                <img
                  className="card-img-top"
                  src="/assets/icons/User-Icon.svg"
                  alt="placeholder user icon"
                />
                <div className="card-body">
                  <div className="profile__header">
                    <h5 className="profile__header--title card-title">
                      {user.name}
                    </h5>
                    <h6 className="card-subtitle mb-2">{user.headline}</h6>
                  </div>
                  <div className="profile__body">
                    <p className="card-text">
                      <ul className="profile__body--list">
                        <li>{user.group}</li>
                        {user.position ? <li> {user.position} </li> : ""}
                        {user.education ? <li> {user.education} </li> : ""}
                        {user.land ? <li> {user.land} </li> : ""}
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <aside className="col-lg-6 col-lg-offset-3 align-self-end"></aside>
          </div>
          <div className="profile__about row">
            <section className="col-lg-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <p className="profile__about--title card-title">
                    About me and my interest in Indigenous Art!
                  </p>
                  <p className="profile__about--body card-text">{user.about}</p>
                </div>
              </div>
            </section>
            <aside className="col-lg-6 col-lg-offset-3 align-self-end"></aside>
          </div>
        </div>
      );
    }
  }
}

export default UserProfile;
