/* --------------------------------------------------------------------------------------------------------------------------------------------
  Main navigation logic for the site lives here - please note that the user settings would live in the app.jsx component, not here.
*/
import React from "react";
import SearchForm from "../../../../SearchService/client/components/searchform.jsx";
import { Link } from "react-router";

class MainNav extends React.Component {
  constructor(props) {
    super(props);
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Renders about page, home nav and other necessary pages.
  render() {
    return (
      <div>
        <div id="mainheader" className="container-fluid">
          <div className="row">
            <div id="mainlogo" className="col-lg-2">
              <Link to="landing">
                <img
                  src="../assets/images/logo.png"
                  width="auto"
                  height="180px"
                  alt="Virtual Platform For Indigenous Art"
                  aria-label="Virtual Platform For Indigenous Art"
                />
              </Link>
            </div>

            <div className="col-lg-8 col-lg-offset-2">
              <div className="col-md-8">
                <SearchForm
                  onBlur={this.props.onBlur}
                  onFocus={this.props.onFocus}
                />
              </div>

              <nav className="navcontainer">
                <div className="main-nav-item">
                  <Link
                    to="landing"
                    activeClassName="active-yellow"
                    aria-label="Go to home page"
                  >
                    <span>Home</span>
                  </Link>
                </div>
                <div className="main-nav-item">
                  <Link
                    to="about"
                    activeClassName="active-yellow"
                    aria-label="Go to about page"
                  >
                    <span>About</span>
                  </Link>
                </div>
                <div className="main-nav-item">
                  <Link
                    to="results"
                    activeClassName="active-yellow"
                    aria-label="Go to artwork page"
                  >
                    <span>Artwork</span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MainNav;
