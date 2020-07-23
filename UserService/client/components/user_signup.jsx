/* --------------------------------------------------------------------------------------------------------------------------------------------
  The logic for the User sign up page lives here
*/
import React from "react";
import { hashHistory, Link } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";

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

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Takes user input and sends a post request to the user api to create new user
  handleSignUp() {
    let user = {
      name: encodeURIComponent(this.refs.user_name.value),
      about: encodeURIComponent(this.refs.user_about.value),
      email: encodeURIComponent(this.refs.user_email.value),
      password: encodeURIComponent(this.refs.user_password.value)
    };

    let myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    let myInit = {
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

    fetch("/users", myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          StatusAlertService.showError(response.error.message);
        } else {
          hashHistory.push("login");
          StatusAlertService.showSuccess("User generated");
        }
      });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Sets email variable
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Sets password variable
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Renders the sign up form
  render() {
    const { email, password } = this.state;
    const isEnabled = email.length > 0 && password.length > 0;

    return (
      <div className="fullpage container-fluid">
        <StatusAlert />
        <div className="row">
          <div className="col-lg-8 BGimage image-fade">
            <div className="image-tint-dark"></div>
            <div
              id="carouselExampleIndicators"
              className="carousel about slide"
              data-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active btn btn-outline-light mx-2"
                >
                  About
                </button>

                <button
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                  className="btn btn-outline-light mx-2"
                >
                  Community
                </button>

                <button
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                  className="btn btn-outline-light mx-2"
                >
                  Benefits
                </button>
              </div>
              <div className="carousel-inner user-service">
                <div className="carousel-item active">
                  <div className="header-container">
                    <div className="header-item">
                      <h1 className="signin-carousel text-uppercase">
                        About
                        <br />
                        the VPIA
                      </h1>
                    </div>
                    <div className="header-item">
                      <img
                        src="../assets/images/logo-white-notext.png"
                        width="110px"
                        height="auto"
                        alt="VPIA logo"
                        aria-label="VPIA logo"
                        className="float-right"
                      />
                    </div>
                  </div>
                  <p className="signin-carousel">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean varius augue ut neque lacinia, a mattis lorem
                    commodo. Suspendisse potenti. Proin ultricies diam et urna
                    tincidunt tincidunt. Sed facilisis consectetur faucibus. In
                    vitae dolor quis mi fringilla condimentum non ut nulla. Sed
                    ornare erat diam, sed ultrices magna faucibus condimentum.
                    Vivamus in ullamcorper quam. Integer vel dapibus nisl. Nam
                    lacinia, neque vitae bibendum egestas.
                  </p>
                  <button className="btn btn-outline-light">Learn More</button>
                </div>
                <div className="carousel-item">
                  <div className="header-container">
                    <div className="header-item">
                      <h1 className="signin-carousel text-uppercase">
                        Community
                        <br />
                        of the VPIA
                      </h1>
                    </div>
                    <div className="header-item">
                      <img
                        src="../assets/images/logo-white-notext.png"
                        width="110px"
                        height="auto"
                        alt="VPIA logo"
                        aria-label="VPIA logo"
                        className="float-right"
                      />
                    </div>
                  </div>
                  <p className="signin-carousel">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean varius augue ut neque lacinia, a mattis lorem
                    commodo. Suspendisse potenti. Proin ultricies diam et urna
                    tincidunt tincidunt. Sed facilisis consectetur faucibus. In
                    vitae dolor quis mi fringilla condimentum non ut nulla. Sed
                    ornare erat diam, sed ultrices magna faucibus condimentum.
                    Vivamus in ullamcorper quam. Integer vel dapibus nisl. Nam
                    lacinia, neque vitae bibendum egestas.
                  </p>
                  <button className="btn btn-outline-light">Learn More</button>
                </div>
                <div className="carousel-item">
                  <div className="header-container">
                    <div className="header-item">
                      <h1 className="signin-carousel text-uppercase">
                        Benefits
                        <br />
                        of the VPIA
                      </h1>
                    </div>
                    <div className="header-item">
                      <img
                        src="../assets/images/logo-white-notext.png"
                        width="110px"
                        height="auto"
                        alt="VPIA logo"
                        aria-label="VPIA logo"
                        className="float-right"
                      />
                    </div>
                  </div>
                  <p className="signin-carousel">
                    <ul>
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>Consectetur adipiscing elit</li>
                      <li>Integer molestie lorem at massa</li>
                      <li>Facilisis in pretium nisl aliquet</li>
                      <li>Nulla volutpat aliquam velit</li>
                    </ul>
                  </p>
                  <button className="btn btn-outline-light">Learn More</button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 right-panel">
            <img
              src="../assets/images/logo.png"
              width="124px"
              height="auto"
              alt="VPIA logo"
              aria-label="VPIA logo"
            />
            <div className="container signup-box row">
              <form className="col-sm-12">
                <label for="inputName">Name</label>
                <div className="form-group login-form">
                  <input
                    type="text"
                    className="form-control"
                    ref="user_name"
                    id="inputName"
                    aria-label="name"
                  />
                </div>
                <label for="inputUserName">Username</label>
                <div className="form-group login-form">
                  <input
                    type="text"
                    className="form-control"
                    ref="user_name"
                    id="inputUserName"
                    aria-label="user name"
                  />
                </div>
                <label for="inputUserEmail">Email</label>
                <div className="form-group input-group login-form">
                  <input
                    type="email"
                    className="form-control"
                    ref="user_email"
                    id="inputUserEmail"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                </div>
                <label for="inputUserPassword">New Password</label>
                <div className="form-group input-group login-form">
                  <input
                    type="password"
                    className="form-control"
                    ref="user_password"
                    id="inputUserPassword"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <label for="inputUserAffiliation">Affiliation</label>
                <small
                  id="AffliationHelp"
                  class="form-text text-muted font-weight-light"
                >
                  Affiliation Example: community, organization, institution…
                </small>
                <div className="form-group input-group login-form">
                  <input
                    type="text"
                    className="form-control"
                    ref="user_affliation"
                    id="inputUserAffiliation"
                    aria-describedby="AffliationHelp"
                  />
                </div>
                <label for="inputUserAbout">Bio Statement</label>
                <div className="form-group input-group login-form">
                  <input
                    type="text"
                    className="form-control"
                    ref="user_about"
                    id="inputUserAbout"
                    aria-label="user about"
                  />
                </div>
                <label for="inputUserExperience">Training and Experience</label>
                <small
                  id="ExperienceHelp"
                  class="form-text text-muted font-weight-light"
                >
                  Help other users to understand where your comments are coming
                  from
                </small>
                <div className="form-group input-group login-form">
                  <input
                    type="text"
                    className="form-control"
                    ref="user_experience"
                    id="inputUserExperience"
                    aria-label="training and experience"
                    aria-describedby="ExperienceHelp"
                  />
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isChecked"
                    id="contactOption"
                    value=""
                  />
                  <label
                    className="form-check-label signup-check"
                    for="contactOption"
                  >
                    <small>
                      I want my email address and affiliation appear when I make
                      edits so that others can contact me.
                    </small>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isChecked"
                    id="contactOption"
                    value=""
                  />
                  <label
                    className="form-check-label signup-check"
                    for="contactOption"
                  >
                    <small>
                      By checking this box you agree to the VPIA{" "}
                      <a
                        className="none-deco"
                        href="https://foundation.wikimedia.org/wiki/Terms_of_Use/en"
                      >
                        <u>User Agreement</u>
                      </a>
                      , and{" "}
                      <a
                        className="none-deco"
                        href="https://foundation.wikimedia.org/wiki/Terms_of_Use/en"
                      >
                        <u>Terms of Policy</u>
                      </a>
                      .
                    </small>
                  </label>
                </div>
                <div className="form-group">
                  <button
                    onClick={this.handleSignUp}
                    disabled={!isEnabled}
                    className="btn btn-primary btn-block mt-5"
                  >
                    Agree & Join
                  </button>
                  <button className="btn btn-outline-secondary btn-block join-btn">
                    <Link to="login" className="none-deco">
                      Already on VPIA? Sign In
                    </Link>
                  </button>
                </div>
                <Link
                  to="landing"
                  aria-label="Go to home page"
                  className="none-deco"
                >
                  <p class="font-italic text-sm-left return-text">
                    Return to homepage
                  </p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSignup;
