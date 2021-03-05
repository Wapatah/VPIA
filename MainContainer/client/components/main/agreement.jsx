/* --------------------------------------------------------------------------------------------------------------------------------------------
  Simple Agreement Page.
*/
import React from "react";
import { Link, hashHistory } from "react-router";
import AnchorButton from "./anchor_button.jsx";

class Agreement extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="col-xl-10 col-lg-12 float-right">
              <AnchorButton anchor_name="Copyright" anchor_id="#copyright" />
              <AnchorButton
                anchor_name="Accuracy of Content"
                anchor_id="#accuracy"
              />
              <AnchorButton anchor_name="External Links" anchor_id="#links" />
              <AnchorButton
                anchor_name="Link Maintenance"
                anchor_id="#link-mantenance"
              />
              <AnchorButton anchor_name="Privacy" anchor_id="#privacy" />
              <AnchorButton
                anchor_name="Online Security"
                anchor_id="#security"
              />
              <AnchorButton
                anchor_name="Cybersecurity"
                anchor_id="#cybersecurity"
              />
              <AnchorButton
                anchor_name="Responsible Use of Information Technology"
                anchor_id="#responsible"
              />
            </div>
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
              <div className="tab-bar-card agreement">
                <p>
                  By signing-up and participating in the VPIA, users (hereby
                  referred to as Community-Members) agree to the following:
                </p>
                <h6 id="copyright">Copyright</h6>
                <hr />
                <p>
                  All images and catalogue data of objects posted on the VPIA
                  are protected by copyright. Reproduction is prohibited without
                  the express authorization of the copyright owner. The holding
                  institution (e.g. Royal Ontario Museum, Glenbow Museum, etc.)
                  owns and is responsible for all copyright notices covering the
                  images, the holding institution’s catalogue data, and any
                  other accompanying credits. Any commercial or publication use
                  is strictly prohibited. Copying, redistribution, or
                  exploitation for personal or corporate gain is not permitted.
                  Requests to use images or information appearing on the VPIA
                  institutional records must be directed to the appropriate
                  holding institution.
                </p>
                <h6 id="accuracy">Accuracy of Content</h6>
                <hr />
                <p>
                  Although reviewed for accuracy at the time of posting,
                  information available on the VPIA is subject to change without
                  notice. Community-Members should confirm the accuracy of
                  information before taking any related action. Errors noted
                  regarding VPIA content should be reported to VPIA@ocadu.ca
                </p>
                <h6 id="links">External Links</h6>
                <hr />
                <p>
                  The VPIA website contains links to outside communities and
                  organizations with whom the VPIA has established partnerships,
                  or which are deemed appropriate and useful to furthering the
                  VPIA mandate. At this time, we are unable to accept general
                  requests to create links to sites external to the work of the
                  VPIA.
                </p>
                <h6 id="link-mantenance">Link Maintenance</h6>
                <hr />
                <p>
                  VPIA staff make every effort to ensure that links on the
                  Platform are viable. Broken links do go unnoticed from time to
                  time, however, and Community-Members are encouraged to report
                  them to VPIA@ocadu.ca
                </p>
                <h6 id="privacy">Privacy</h6>
                <hr />
                <p>
                  Your email address, contact information, and online data will
                  not be sold, rented, or otherwise distributed to any third
                  party.
                </p>
                <h6 id="security">Online Security</h6>
                <hr />
                <p>
                  To prevent unauthorized VPIA access, maintain data accuracy,
                  and ensure the correct use of information, VPIA has in place
                  appropriate physical, electronic, and managerial procedures to
                  safeguard and secure the information stored on the Platform.
                </p>
                <h6 id="cybersecurity">Cybersecurity</h6>
                <hr />
                <p>
                  While every effort is made to ensure that information on VPIA
                  does not contain malware, Community-Members are responsible
                  for taking reasonable and appropriate precautions to avoid
                  them.Please ensure that you have a complete and current backup
                  of the applicable items or information contained on your
                  computer system. You should pay specific attention to some of
                  the newer malware that can auto-execute.
                </p>
                <h6 id="responsible">
                  Responsible Use of Information Technology
                </h6>
                <hr />
                <p>
                  Use of this site is governed by the VPIA’s Acceptable Use
                  Policy (AUP).
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
