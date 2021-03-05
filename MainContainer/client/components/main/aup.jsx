/* --------------------------------------------------------------------------------------------------------------------------------------------
  Simple VPIA Acceptable Use Policy (AUP) Page.
*/
import React from "react";
import { Link, hashHistory } from "react-router";
import AnchorButton from "./anchor_button.jsx";

class Aup extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="col-xl-10 col-lg-12 float-right">
              <AnchorButton anchor_name="Purpose" anchor_id="#purpose" />
              <AnchorButton
                anchor_name="Conditions of Access and Use"
                anchor_id="#conditions"
              />
              <AnchorButton
                anchor_name="Complaint and Resolution Process"
                anchor_id="#process"
              />
            </div>
          </div>
          <div className="col-md-6 tabBar-content">
            <div className="tabBar row justify-content-between align-items-end">
              <div className="col tabBar-align">
                <Link
                  to="account_deletion"
                  className="bottom-align-text tabBar-tab yellow-tab"
                  aria-label="Account Deletion tab"
                >
                  Account Deletion
                </Link>
                <Link
                  to="aup"
                  className="none-deco tabBar-tab green-tab is-active"
                  aria-label="VPIA Acceptable Use Policy (AUP) tab"
                >
                  VPIA Acceptable Use Policy (AUP)
                </Link>
                <Link
                  to="agreement"
                  className="none-deco tabBar-tab lightgrey-tab"
                  aria-label="Community-Member Agreement tab"
                >
                  Community-Member Agreement
                </Link>
              </div>
              <div className="tab-bar-card">
                <p>
                  Responsible Use of Information Technology Use of this site is
                  governed by the VPIA’s Acceptable Use Policy (AUP):
                </p>
                <h6 id="purpose">Purpose</h6>
                <hr />
                <p>
                  The purpose of this AUP is to set forth the acceptable use of
                  the Virtual Platform for Indigenous Art, hereinafter referred
                  to as the “Platform” and to outline what constitutes
                  unacceptable use of the Platform and the consequences of
                  violating this policy. The Platform exists to support
                  Knowledge Sharing about the works of art found on the VPIA by
                  its users, hereinafter referred to as the “Community-Members.”
                  Maintenance and supervision of the Platform is performed by
                  VPIA staff to ensure user confidence, in the integrity and
                  security of the resource and to establish consistent
                  procedures and regulations.
                </p>
                <h6 id="conditions">Conditions of Access and Use</h6>
                <hr />
                <p>
                  Any Community-Member who has created a profile on the VPIA via
                  a User identification and Password, is bound to comply with
                  this policy.
                </p>
                <p>
                  Community-Members are permitted to use only the account for
                  which they are authorized, and shall take necessary
                  precautions to prevent others from obtaining access to their
                  profile information by keeping individual passwords
                  confidential and by changing them regularly.
                </p>
                <p>
                  The Virtual Platform for Indigenous Art is intended for
                  research and knowledge-sharing activities. Information
                  contained in the Platform is protected either by the copyright
                  of the holding institution or is acknowledged as Creative
                  Commons (Attribution 2.5 Canada). Offering VPIA information or
                  services for sale or personal gain is strictly prohibited.
                </p>
                <p>
                  Community-Members are expected to treat each contributing
                  member with respect and dignity, according to the Canadian
                  Charter of Rights and Freedoms, the Criminal Code of Canada,
                  and the Ontario Human Rights Code. Failure to do so will
                  result in the termination of the Community-Member Profile. Any
                  use of the VPIA that violates the Charter, the Criminal Code,
                  the Ontario Code, or any federal, provincial, or municipal
                  laws or regulations is strictly prohibited. Community-Members
                  are prohibited from using the Platform in a threatening,
                  discriminatory, or harassing manner. Any use of the Platform
                  that is in violation of the above is prohibited.
                </p>
                <p>
                  VPIA assumes that any information or data made available on
                  the Platform is public and will be treated as such unless the
                  Community-Member removes it. Copying other Community-Members’
                  information without giving appropriate credit is prohibited.
                  Entry into the Platform by individuals not specifically
                  authorized shall be viewed as a contravention of the Trespass
                  to Property Act and normal legal sanctions will be applicable.
                </p>
                <p>
                  Work performed by the VPIA Administrator for maintenance or
                  diagnostic purposes may at times require individual
                  Community-Member data. However, the Platform Administrator
                  will maintain Community-Member privacy and information. In the
                  case where a serious violation has occurred, the Platform
                  Administrator will report the matter to the appropriate
                  authorities and Community-Members will be notified, if
                  required.
                </p>
                <p>
                  No Community-Member shall deliberately jeopardize the
                  integrity of another member, or the Knowledge shared upon the
                  Platform. This includes but is not limited to: unauthorized
                  use of another Community-Member’s profile and password;
                  seeking information about another Community-Member for the
                  purpose of malicious intent; attempting to degrade Platform
                  performance or capability; attempting to damage systems or
                  software; and knowingly posting incorrect, offensive, or
                  exclusionary information that contravenes this Acceptable Use
                  Policy. Any violation of copyright, patent, trademark, trade
                  secret, or other intellectual property rights via the Platform
                  is prohibited. The VPIA assumes no liability for any breach of
                  copyright resulting from a violation of this Acceptable Use
                  Policy, and will assist any holding institution, with just
                  cause, to prosecute individuals violating copyright laws.
                </p>
                <p>
                  VPIA retains the right to remove content, information, or
                  communications within the Platform that are in violation of
                  this AUP.
                </p>
                <h6 id="process">Complaint and Resolution Process</h6>
                <hr />
                <p>
                  The VPIA Administrator may become aware of alleged violations
                  of the AUP either through a complaint or through the course of
                  normal operations. Confidential data will not be examined
                  without probable cause and approval from the VPIA Director to
                  conduct an investigation. The findings of the investigation
                  will be delivered to the Director to determine what
                  disciplinary action is required, if any. If, in the opinion of
                  the Administrator, the integrity or security of the Platform
                  is at immediate risk, the Administrator is authorized to take
                  necessary steps to protect the Platform. Such steps may
                  include the locking of a Community-Member Profile or Profiles,
                  the removal of offensive or derogatory information, and the
                  reversal of deleted information prior to a formal
                  investigation on an interim basis until the perceived threat
                  has been resolved.
                </p>
                <p>
                  The Platform Administrator, upon receipt of a complaint from
                  one VPIA Community-Member about another VPIA Community-Member,
                  or from an internal or external actor, that a violation of the
                  AUP has occurred, will initiate an investigation. If this
                  requires the examination of information, passwords, or
                  profiles of individual Community-Members, the Platform
                  Administrator will seek the proper authorization from the VPIA
                  Director before proceeding.
                </p>
                <p>
                  Depending on the findings of the preliminary investigation the
                  Platform Administrator may take one of the following courses
                  of action:
                </p>
                <p>
                  If the Platform Administrator determines that there has been
                  no violation of the AUP, then no further action will be taken
                  other than to inform the complainants, and the Director of
                  this decision.
                </p>
                <p>
                  If the Platform Administrator determines that a
                  Community-Member has violated the AUP but that the offence is
                  not intentional, serious, or malicious, then the
                  Community-Member will be informed of the decision and asked to
                  discontinue the activities that are in violation of the AUP.
                </p>
                <p>
                  If the Community-Member refuses to comply, the Platform
                  Administrator will consult with the Director to authorize to
                  restrict the Community-Member’s access while the matter is
                  further reviewed. The decision to restore the
                  Community-Member’s account access will then reside with the
                  outcome of the investigation.
                </p>
                <p>
                  If the Platform Administrator determines a Community-Member to
                  be in violation of the AUP and that the offence is
                  sufficiently serious, and/or that the Community-Member may
                  have violated federal, provincial, or municipal laws, the
                  Platform Administrator will then initiate an investigation and
                  make a recommendation as to whether the Community-Member’s
                  access should be disabled.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Aup;
