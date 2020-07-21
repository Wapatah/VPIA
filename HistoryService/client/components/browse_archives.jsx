/* --------------------------------------------------------------------------------------------------------------------------------------------
  This is the logic for clicking through archives and seeing the differences between
  Article versions.
*/
import React from "react";
import Loader from "./helpers/loader.jsx";
import StatusAlert, { StatusAlertService } from "react-status-alert";

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
      "http://localhost:31000/api/articles/" +
      this.props.articleId +
      "/history";

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
            <button
              className="collapse-toggle btn btn-default"
              type="button"
              data-toggle="collapse"
              data-parent="custom-collapse"
              data-target="#side-menu-collapse"
            >
              View Archives
            </button>
            <br />
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
                className="list-group-item dropdown-toggle"
                onClick={e => this.archiveSelect(archive.id, e)}
              >
                <h4 className="list-group-item-heading">
                  {new Date(archive.updated_at.replace(" ", "T")).toUTCString()}
                </h4>
                <p className="list-group-item-text">{archive.what_changed}</p>
              </a>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default BrowseArchives;
