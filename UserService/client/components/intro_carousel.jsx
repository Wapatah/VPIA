/* --------------------------------------------------------------------------------------------------------------------------------------------
  Introduction carousel component on the log-in and sign-up pages
*/
import React from "react";
import { hashHistory, Link } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";

class IntroCarousel extends React.Component {
  render() {
    return (
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              varius augue ut neque lacinia, a mattis lorem commodo. Suspendisse
              potenti. Proin ultricies diam et urna tincidunt tincidunt. Sed
              facilisis consectetur faucibus. In vitae dolor quis mi fringilla
              condimentum non ut nulla. Sed ornare erat diam, sed ultrices magna
              faucibus condimentum. Vivamus in ullamcorper quam. Integer vel
              dapibus nisl. Nam lacinia, neque vitae bibendum egestas.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              varius augue ut neque lacinia, a mattis lorem commodo. Suspendisse
              potenti. Proin ultricies diam et urna tincidunt tincidunt. Sed
              facilisis consectetur faucibus. In vitae dolor quis mi fringilla
              condimentum non ut nulla. Sed ornare erat diam, sed ultrices magna
              faucibus condimentum. Vivamus in ullamcorper quam. Integer vel
              dapibus nisl. Nam lacinia, neque vitae bibendum egestas.
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
            <button className="btn btn-outline-light">Learn More</button>
          </div>
        </div>
      </div>
    );
  }
}
export default IntroCarousel;
