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

        <div className="container-fluid">
          <div className="row row-centered">

            <div className="col-md-8 col-md-offset-2">
              <h1 className="MainHeader">
                Virtual Platform for Indigenous Art
              </h1>

              <div className="col-md-8">
                <nav className="nav">
                  <ul className="nav justify-content-center">
                    <li className="nav-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="nav-item">
                      <a href="#">About VPIA</a>
                    </li>
                    <li className="nav-item">
                      <a href="#">Artwork</a>
                    </li>
                    <li className="nav-item">
                      <a href="#">Conversation</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-8 col-centered">
              <SearchForm />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
