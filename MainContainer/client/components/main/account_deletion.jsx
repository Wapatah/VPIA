/* --------------------------------------------------------------------------------------------------------------------------------------------
  Simple Account Deletion Page
*/
import React from "react";
import { Link, hashHistory } from "react-router";

class AccountDeletion extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 tabBar-content">
            <div className="tabBar row justify-content-between align-items-end">
              <div className="col tabBar-align">
                <Link
                  to="account_deletion"
                  className="bottom-align-text tabBar-tab yellow-tab is-active"
                  aria-label="Account Deletion tab"
                >
                  Account Deletion
                </Link>
                <Link
                  to="aup"
                  className="none-deco tabBar-tab green-tab"
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
              <div className="tab-bar-card account_deletion">
                <p>
                  If you want to permanently delete your VPIA account, let us
                  know.
                </p>
                <h6>Permanently Delete Account</h6>
                <hr />
                <p>
                  VPIA Community Member Deactivation Protocol <p />
                  <p>
                    Thank you for using and being a contributing community
                    member to the Virtual Platform for Indigenous Art. This is
                    to confirm that you are deleting your community member
                    profile of your own volition, and in so doing, agree to the
                    following terms:
                  </p>
                  <ul className="number-list">
                    <li>
                      The information you have contributed to the VPIA is
                      public. If you have removed or deleted contributions from
                      your history, these remain deleted. If contributions are
                      leftover after you have deleted your community member
                      profile, these contributions will not be deleted by the
                      VPIA administrator and your posting history will appear as
                      deleted_user_123456.
                    </li>
                    <li>
                      If at any time you wish to return to the VPIA, you cannot
                      access your original community member profile and will be
                      unable to edit any contributions associated to the deleted
                      community member profile.
                    </li>
                    <li>
                      Any remaining contribution history falls under Creative
                      Commons (Attribution 2.5 Canada).
                    </li>
                  </ul>
                  Please send an “account deletion request” to VPIA@ocadu.ca to
                  delete your account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountDeletion;
