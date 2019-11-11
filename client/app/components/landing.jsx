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
        <div id="VPIA-intro" className="container-fluid">
          <div className="row">
            <div className="col-8">
              <div id="VPIA-intro" className="jumbotron image-bg">
                <h1 className="display-4">VPIA</h1>
                <p className="lead">Search and edit 2000 indigenous Artworks</p>
                <hr className="my-4"></hr>
                <p>
                  It uses utility classes for typography and spacing to space
                  content out within the larger container.
                </p>
                <a
                  className="btn btn-outline-light btn-lg btn-round"
                  href="#"
                  role="button"
                >
                  Learn more
                </a>
              </div>
            </div>
            <div id="VPIA-intro-right" className="col-4">
              <h5 className="title-primary underline-brush">
                Project at a Glance!
              </h5>

              <h6>How to Use the VPIA?</h6>
              <p className="article-title">Tutorial</p>
              <p className="description">
                Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad
                has appareat…
              </p>
              <h6>Contributors</h6>
              <p className="article-title">Article title</p>
              <p p className="description">
                Lorem ipsum dolor sit amet, ipsum labitur lucilius mel id, ad
                has appareat…
              </p>
            </div>
          </div>
        </div>
        <Home />
      </div>
    );
  }
}

export default Landing;
