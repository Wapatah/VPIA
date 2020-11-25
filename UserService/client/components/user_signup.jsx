/* --------------------------------------------------------------------------------------------------------------------------------------------
  The logic for the User sign up page lives here
*/
import React from "react";
import { hashHistory, Link } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import Tabs from "./tabs.jsx";
import IntroCarousel from "./intro_carousel.jsx";

const emailPattern = /\S+@\S+/;

class UserSignup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {
      hidden: true,
      email: "",
      password: "",
      name: "",
      group: "",
      position: "",
      organization: "",
      education: ""
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Takes user input and sends a post request to the user api to create new user
  async handleSignUp() {
    let user = {
      name: encodeURIComponent(this.refs.user_name.value),
      email: encodeURIComponent(this.refs.user_email.value),
      password: encodeURIComponent(this.refs.user_password.value),
      position:
        this.refs.position.value.trim().length !== 0
          ? encodeURIComponent(this.refs.position.value)
          : "N/A",
      group:
        typeof this.refs.culture_group !== "undefined"
          ? encodeURIComponent(this.refs.culture_group.value)
          : "N/A",
      organization:
        this.refs.institution.value.trim().length !== 0
          ? encodeURIComponent(this.refs.institution.value)
          : "N/A",
      education:
        this.refs.education.value.trim().length !== 0
          ? encodeURIComponent(this.refs.education.value)
          : "N/A"
    };

    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    let request = {
      method: "POST",
      headers: headers,
      body:
        "name=" +
        user.name +
        "&email=" +
        user.email +
        "&password=" +
        user.password +
        "&position=" +
        user.position +
        "&group=" +
        user.group +
        "&organization=" +
        user.organization +
        "&education=" +
        user.education
    };

    try {
      const res = await fetch("http://localhost:32000/api/users", request);
      StatusAlertService.showSuccess("User Created Successfully!");
      hashHistory.push("login");
    } catch (err) {
      StatusAlertService.showError(err);
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  //initiate tooltip in Bootstap
  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  componentDidUpdate() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
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
    const isEnabled =
      email.length > 0 &&
      emailPattern.test(this.state.email) &&
      password.length > 0;

    return (
      <div className="fullpage container-fluid">
        <StatusAlert />
        <div className="row">
          <div className="col-lg-8 BGimage image-fade">
            <div className="image-tint-dark"></div>
            <IntroCarousel />
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
              <form className="col-sm-12 was-validated">
                <label htmlFor="inputName">
                  Preferred Name<span className="text-danger">*</span>
                  <i
                    className="fa fa-question-circle tooltip-btn"
                    aria-hidden="true"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="First name & last name or preferred name"
                  ></i>
                </label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control login-form"
                    placeholder="First name & last name or preferred name"
                    ref="user_name"
                    id="inputName"
                    aria-label="name"
                    required
                  />
                  <div className="invalid-feedback">
                    Please fill out this field.
                  </div>
                </div>
                <label htmlFor="inputUserEmail">
                  Email <span className="text-danger">*</span>
                </label>
                <div className="form-group input-group">
                  <input
                    type="email"
                    className="form-control login-form"
                    ref="user_email"
                    id="inputUserEmail"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    required
                  />
                  <div className="invalid-feedback">
                    A valid email address is required.
                  </div>
                </div>
                <label htmlFor="inputUserPassword">
                  New Password <span className="text-danger">*</span>
                </label>
                <div className="form-group input-group">
                  <input
                    type="password"
                    className="form-control login-form"
                    ref="user_password"
                    id="inputUserPassword"
                    type={this.state.hidden ? "password" : "text"}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    required
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary append-light "
                      aria-label="show password"
                      onClick={this.toggleShow}
                    >
                      Show
                    </button>
                  </div>
                  <div className="invalid-feedback">
                    Please fill out this field.
                  </div>
                </div>
              </form>
              <form className="col-sm-12">
                <div>
                  <Tabs>
                    Yes
                    <div className="form-group">
                      <div className="col-sm-11 float-right no-padding mb-3">
                        <label htmlFor="culture_group">
                          Please specify <span className="text-danger">*</span>{" "}
                          <i
                            className="fa fa-question-circle tooltip-btn"
                            aria-hidden="true"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Please share with us the name of your community, ffamily, and/or land."
                          ></i>
                        </label>
                        <input
                          type="text"
                          className="form-control login-form"
                          ref="culture_group"
                          id="culture_group"
                          aria-label="culture_group"
                          required
                        />
                      </div>
                      <label htmlFor="position">
                        Position <i className="text-muted">(Optional)</i>
                        <i
                          className="fa fa-question-circle tooltip-btn"
                          aria-hidden="true"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="What is your most recent position and/or practice."
                        ></i>
                      </label>
                      <input
                        type="text"
                        className="form-control login-form mb-3"
                        ref="position"
                        id="position"
                        aria-label="position"
                      />
                      <label htmlFor="education">
                        Affiliation <i className="text-muted">(Optional)</i>
                        <i
                          className="fa fa-question-circle tooltip-btn"
                          aria-hidden="true"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Please share with us the place of your most recent position"
                        ></i>
                      </label>
                      <input
                        type="text"
                        className="form-control login-form mb-3"
                        ref="institution"
                        id="institution"
                        aria-label="institution"
                        placeholder="Organization or company you are affiliated with"
                      />
                      <label htmlFor="education">
                        Training <i className="text-muted">(Optional)</i>
                        <i
                          className="fa fa-question-circle tooltip-btn"
                          aria-hidden="true"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="What is your relevant training and/or experience? Have you spent time on the land? Have you taken part in a mentorship and/or completed a form of education?"
                        ></i>
                      </label>
                      <input
                        type="text"
                        className="form-control login-form mb-3"
                        ref="education"
                        id="education"
                        aria-label="education"
                      />
                    </div>
                    No
                    <div className="form-group">
                      <label htmlFor="position">
                        <span className="text-danger">*</span>Position
                      </label>
                      <input
                        type="text"
                        className="form-control login-form mb-3"
                        ref="position"
                        id="position"
                        aria-label="position"
                        required
                      />
                      <label htmlFor="education">
                        Affiliation <i className="text-muted">(Optional)</i>
                      </label>
                      <input
                        type="text"
                        className="form-control login-form mb-3"
                        ref="institution"
                        id="institution"
                        aria-label="institution"
                        placeholder="Organization or company you are affiliated with"
                      />
                      <label htmlFor="education">
                        Training <i className="text-muted">(Optional)</i>
                      </label>
                      <input
                        type="text"
                        className="form-control login-form mb-3"
                        ref="education"
                        id="education"
                        aria-label="education"
                      />
                    </div>
                    Prefer not to say
                    <div className="form-group">
                      <label htmlFor="position">
                        <span className="text-danger">*</span>Position
                      </label>
                      <input
                        type="text"
                        className="form-control login-form mb-3"
                        ref="position"
                        id="position"
                        aria-label="position"
                        required
                      />
                      <label htmlFor="education">
                        Affiliation <i className="text-muted">(Optional)</i>
                      </label>
                      <input
                        type="text"
                        className="form-control login-form mb-3"
                        ref="institution"
                        id="institution"
                        aria-label="institution"
                        placeholder="Organization or company you are affiliated with"
                      />
                      <label htmlFor="education">
                        Training <i className="text-muted">(Optional)</i>
                      </label>
                      <input
                        type="text"
                        className="form-control login-form mb-3"
                        ref="education"
                        id="education"
                        aria-label="education"
                      />
                    </div>
                  </Tabs>
                </div>
                <div className="form-check">
                  <label
                    className="form-check-label signup-check"
                    htmlFor="contactOption"
                  >
                    <small>
                      By clicking agree and join, you agree to the VPIA{" "}
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
                  <Link to="login" className="none-deco">
                    <button className="btn btn-outline-secondary btn-block join-btn">
                      Already on VPIA? Sign In
                    </button>
                  </Link>
                </div>
                <Link
                  to="landing"
                  aria-label="Go to home page"
                  className="none-deco"
                >
                  <p className="font-italic text-sm-left return-text">
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
