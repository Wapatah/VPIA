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
          <div className="row row-centered">
            <div id="mainlogo" className="col-md-2">
              <Link to="landing">
                <img
                  src="../assets/logos/logo-white.png"
                  width="auto"
                  height="180px"
                  alt="VPIA logo"
                  aria-label="VPIA logo"
                />
              </Link>
            </div>

            <div className="col-md-8 col-md-offset-2 align-self-end">
              <div className="navcontainer">
                <div className="main-nav-item">
                  <a href="#">
                    <i className="fa fa-home"></i>
                    <span>Home</span>
                  </a>
                </div>
                <div className="main-nav-item">
                  <a href="#">
                    <i className="fa fa-image"></i>
                    <span>About</span>
                  </a>
                </div>
                <div className="main-nav-item">
                  <a href="#">
                    <i className="fa fa-image"></i>
                    <span>Artwork</span>
                  </a>
                </div>
                <div className="main-nav-item">
                  <a href="#">
                    <i className="fa fa-comment"></i>
                    <span>Conversation</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="searchform" className="container-fluid">
          <div className="col-md-4 col-centered">
            <SearchForm />
          </div>
        </div>
      </div>
    );
  }
}
export default MainNav;
