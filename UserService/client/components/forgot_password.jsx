/* --------------------------------------------------------------------------------------------------------------------------------------------
  This is the forgot password page logic and functions relating to emailing recovery instructions.
*/
import React from "react";
import { hashHistory, Link } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import IntroCarousel from "./intro_carousel.jsx";

class ForgotPassword extends React.Component {
  render() {
    return (
      <div className="fullpage container-fluid">
        <StatusAlert />
        <div className="full-page row">
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
              <div className="col-md-12 col-sm-12">
                <div className="col-sm-12">
                  <h1 className="find-account-message">
                    Let's find your account
                  </h1>
                </div>
                <form className="col-md-12 col-sm-12 was-validated">
                  <label htmlFor="inputEmail text-left">
                    Please enter email address you used to sign up
                    <span className="text-danger">*</span>
                  </label>
                  <div className="form-group">
                    <input
                      className="form-control"
                      id="inputEmail"
                      type="email"
                      placeholder="Email"
                      aria-label="Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary btn-block mt-5">
                      Email me recovery instructions
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-block join-btn"
                    >
                      <Link to="/login" className="none-deco">
                        Cancel
                      </Link>
                    </button>
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
      </div>
    );
  }
}
export default ForgotPassword;
