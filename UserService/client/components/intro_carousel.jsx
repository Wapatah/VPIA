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
              The Virtual Platform for Indigenous Art (VPIA) brings artworks
              from global museums and institutions together in an interactive
              space for you to explore. You can be a part of the platform by
              editing the records and transforming them into living documents.
              Layer your knowledge, stories, and experiences into the community
              VPIA record and become a part of history-making.
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
              As an Indigenous-led project, we are dedicated to building
              relationships that support our VPIA community and the knowledge
              and stories shared within. We work to facilitate meaningful
              engagement with Indigenous knowledge through our practices and
              values. With support and guidance from our 4 Protocols, we are
              building the VPIA as an interactive space that sparks open
              dialogue and connects generations of knowledge.
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
              <p className="signin-carousel">
                Explore. Edit. Connect. Transform.
                <ul>
                  <li>Explore the VPIA’s collection of Indigenous Art</li>
                  <li>
                    Transform institutional artwork records into living
                    documents
                  </li>
                  <li>
                    Edit and revive institutional records by layering your
                    knowledge and stories
                  </li>
                  <li>
                    Connect and share alongside other VPIA Community Members
                  </li>
                </ul>
              </p>
            </div>
            <button className="btn btn-outline-light">Learn More</button>
          </div>
        </div>
      </div>
    );
  }
}
export default IntroCarousel;
