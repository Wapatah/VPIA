import React from "react";
import { hashHistory, Link } from "react-router";
import Alert from "react-s-alert";
import SearchForm from "./searchform.jsx";

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="container-fluid container">
          <div className="row row-centered">
            <div className="col align-self-center">
              <h1 className="MainHeader">
                Virtual Platform for Indigenous Art
              </h1>
              <div className="col-md-8 col-centered">
                <div className="navcontainer">
                  <div className="main-nav">
                    <a href="#">
                      <i className="fa fa-home"></i>
                      <span>Home</span>
                    </a>
                  </div>
                  <div className="main-nav">
                    <a href="#">
                      <i className="fa fa-image"></i>
                      <span>About VPIA</span>
                    </a>
                  </div>
                  <div className="main-nav">
                    <a href="#">
                      <i className="fa fa-image"></i>
                      <span>Artwork</span>
                    </a>
                  </div>
                  <div className="main-nav">
                    <a href="#">
                      <i className="fa fa-comment"></i>
                      <span>Conversation</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-centered">
                <SearchForm />
              </div>
            </div>
          </div>
        </div>

        <div id="VPIA-intro" className="container-fluid">
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
      </div>
    );
  }
}

export default Landing;
