import React from "react";
import SearchForm from "./searchform.jsx";
import { Link, hashHistory } from "react-router";

class MainNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="mainheader" className="container-fluid">
          <div id="mainlogo">
            <Link to="landing">
              <img
                src="../assets/logo-white.png"
                width="auto"
                height="180px"
                alt="VPIA logo"
                aria-label="VPIA logo"
              />
            </Link>
          </div>
          <div className="row row-centered">
            <div className="col align-self-center">
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
                      <span>About</span>
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
            </div>
          </div>
        </div>
        <div id="searchform" className="container-fluid">
          <div className="col-md-8 col-centered">
            <SearchForm />
          </div>
        </div>
      </div>
    );
  }
}
export default MainNav;
