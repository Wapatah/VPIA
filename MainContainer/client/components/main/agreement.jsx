/* --------------------------------------------------------------------------------------------------------------------------------------------
  Simple Agreement Page.
*/
import React from "react";
import { Link, hashHistory } from "react-router";

class Agreement extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h5>Copyright</h5>
            <h5>Accuracy of Content</h5>
            <h5>External Links</h5>
            <h5>Link Maintenance</h5>
            <h5>Privacy</h5>
            <h5>Online Security</h5>
            <h5>Cybersecurity</h5>
            <h5>Responsible Use of Information Technology</h5>
          </div>
          <div className="col-md-6 tabBar-content">
            <div className="tabBar row justify-content-between align-items-end">
              <div className="col tabBar-align">
                <Link
                  className="bottom-align-text tabBar-tab yellow-tab"
                  aria-label="Account Deletion tab"
                >
                  Account Deletion
                </Link>
                <Link
                  className="none-deco tabBar-tab green-tab"
                  aria-label="VPIA Acceptable Use Policy (AUP) tab"
                >
                  VPIA Acceptable Use Policy (AUP)
                </Link>
                <Link
                  className="none-deco tabBar-tab lightgrey-tab is-active"
                  aria-label="Community-Member Agreement tab"
                >
                  Community-Member Agreement
                </Link>
              </div>
              <div className="tab-bar-card">
                <p>
                  By signing-up and participating in the VPIA, users (hereby
                  referred to as Community-Members) agree to the following:
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Agreement;
