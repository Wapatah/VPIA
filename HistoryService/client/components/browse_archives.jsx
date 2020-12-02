/* --------------------------------------------------------------------------------------------------------------------------------------------
  This is the logic for clicking through archives and seeing the differences between
  Article versions.
*/
import React from "react";
import Loader from "./helpers/loader.jsx";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import HistoryService from "../../config/config.json";

class BrowseArchives extends React.Component {
  constructor(props) {
    super(props);
    this.archiveSelect = this.archiveSelect.bind(this);
    this.state = { archives: [], loading: true };
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------
    On initial load, get all archives by Article ID.
  */
  componentDidMount() {
    let myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    let myInit = { method: "GET", headers: myHeaders };
    let that = this;
    let url =
      `${HistoryService.URL}/api/articles/` + this.props.articleId + "/history";

    fetch(url, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          StatusAlertService.showError(response.error.message);
        } else {
          that.setState({ archives: response.data });
        }
        that.setState({ loading: false });
      });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Click through archives - this is called in the history component to allow easy archive changes
  archiveSelect(id, e) {
    e.preventDefault();
    this.props.archiveChange(id);
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Displays the left column of the Article history and lists all archives. Archive Pagination would happen here.
  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.archives.length < 1) {
      return (
        <p className="help-block center-align">
          There are no archives for this article
        </p>
      );
    } else {
      return (
        <div className="custom-collapse">
          <StatusAlert />
          <div className="visible-xs">
            <h1 className="green-title">Contribution History</h1>
            <br />
          </div>
          <div
            className="list-group collapse archive-list"
            id="side-menu-collapse"
          >
            {this.state.archives.map(archive => (
              <a
                key={archive.id}
                href="#"
                className="list-group-item archive dropdown-toggle none-deco"
                onClick={e => this.archiveSelect(archive.id, e)}
              >
                <p className="list-group-item-date font-italic">
                  {new Date(archive.updated_at.replace(" ", "T")).toUTCString()}
                </p>
                <p className="list-group-item-text">{archive.what_changed}</p>
                <p className="list-group-item-text">View Changes</p>
              </a>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default BrowseArchives;
