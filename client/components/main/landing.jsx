/* --------------------------------------------------------------------------------------------------------------------------------------------
  Landing page is the actual homepage - this page contains details on the platform and loads the Home component.
*/
import React from "react";
import Home from "./home.jsx";
import StatusAlert from "react-status-alert";
import { ReactSVG } from "react-svg";
import InfoBox from "../helpers/InfoBox.jsx";

const Landing = () => {
  /* --------------------------------------------------------------------------------------------------------------------------------------------
    Renders information specific to the VPIA goal - add in links to tutorials
    and other help material here
  */
  return (
    <div id="VPIA-intro" className="container-fluid">
      <StatusAlert />
      <div className="row">
        <LandingLeft />
        <div id="VPIA-intro-right" className="col-4">
          <h5 className="title-primary underline-brush">
            Project at a Glance!
          </h5>

          <h6>How to Use the VPIA?</h6>
          <InfoBox
            title="Tutorial"
            description="Visit our interactive tutorial for more information on how to locate
            and contribute to artworks through the VPIA."
          />
          <InfoBox
            title="Contributors"
            description="Learn more about the people and organizations who are sharing their
            knowledge with the VPIA."
          />
        </div>
        <LandingBanner />
      </div>
      <Home />
    </div>
  );
};

const LandingLeft = () => {
  return (
    <div id="VPIA-intro" className="col-8 jumbotron">
      <div className="row intro-content">
        <div className="col-8">
          <p className="lead">Search and edit 2000 indigenous Artworks</p>
          <p id="Baskerville">
            Help animate Indigenous collections worldwide by sharing your
            experience and knowledge about them.
          </p>
        </div>
        <div className="col-4">
          <a
            className="btn btn-outline-light btn-lg btn-round float-right"
            href="#"
            role="button"
          >
            Learn more
          </a>
        </div>
      </div>
      <div className="image-tint"></div>
    </div>
  );
};

const LandingBanner = () => {
  return (
    <div id="function-intro" className="col-12">
      <div className="container">
        <div className="col-md-10 col-centered">
          <h3 className="text-center">I'd like to...</h3>
          <br />
          <div class="row row-centered">
            <div className="col-sm">
              <ReactSVG
                src="../../assets/icons/Artwork.svg"
                beforeInjection={svg => {
                  svg.setAttribute("style", "padding-top:6px");
                  svg.setAttribute("width", "20%");
                  svg.setAttribute("height", "20%");
                }}
              />
              <h4>Explore artworks</h4>
              <p>
                Single point of access to art works in different institutions
              </p>
            </div>
            <div className="col-sm">
              <ReactSVG
                src="../../assets/icons/Conversation.svg"
                beforeInjection={svg => {
                  svg.setAttribute("width", "20%");
                  svg.setAttribute("height", "20%");
                }}
              />
              <h4>Connect with communities</h4>
              <p>Find who shared knowledge about artworks</p>
            </div>
            <div className="col-sm">
              <ReactSVG
                src="../../assets/icons/Conversation.svg"
                beforeInjection={svg => {
                  svg.setAttribute("width", "20%");
                  svg.setAttribute("height", "20%");
                }}
              />
              <h4>Share my knowledge</h4>
              <p>
                Contribute to artworks records to turn them into living
                documents
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
