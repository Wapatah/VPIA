import React from "react";
import { hashHistory, Link } from "react-router";
import Alert from "react-s-alert";
import SearchForm from "./searchform.jsx";
import Home from "./home.jsx";

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-8">
              <div id="VPIA-intro" className="jumbotron">
                <h1 className="display-4">VPIA</h1>
                <p className="lead">Search and edit 2000 indigenous Artworks</p>
                <hr className="my-4"></hr>
                <p>
                  It uses utility classes for typography and spacing to space
                  content out within the larger container.
                </p>
                <a className="btn btn-secondary btn-lg" href="#" role="button">
                  Learn more
                </a>
              </div>
            </div>
            <div id="VPIA-intro-right" className="col-4">
              <h6>VPIA Project in a Glance!</h6>
              <h5>How to Use the VPIA?</h5>
              <h6>Tutorial</h6>
              <p>
                Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad
                has appareat…
              </p>
              <h5>Contributors</h5>
              <h6>Article title</h6>
              <p>
                Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad
                has appareat…
              </p>
            </div>
          </div>
        </div>
        <Home />
        <div className="container-fluid">
          <div className="row"></div>
        </div>
      </div>
    );
  }
}

export default Landing;
