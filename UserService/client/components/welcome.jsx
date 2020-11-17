/* --------------------------------------------------------------------------------------------------------------------------------------------
  This is the welcome message page after user logged in
*/
import React from "react";
import { hashHistory, Link } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import IntroCarousel from "./intro_carousel.jsx";

class Welcome extends React.Component {
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
              <img
                src="../assets/images/team_welcome.JPG"
                width="343px"
                height="auto"
                alt="VPIA team"
                aria-label="VPIA team"
                className="mx-auto d-block"
              />
              <h5 className="mt-3 text-center mx-auto ">
                Message from VPIA Team <br />
                Thank you for joining us and
                <br /> welcome to VPIA Community!
              </h5>
              <p className="welcome text-center mx-auto">
                An introduction from the team
              </p>
              <p className="welcome text-center mx-auto">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim…
              </p>
              <Link to="" className="none-deco">
                <button
                  type="button"
                  className="btn btn-primary btn-block mt-5"
                >
                  Proceed to My Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Welcome;
