/* --------------------------------------------------------------------------------------------------------------------------------------------
  Logic for the Article history button that displays the revision history of the platform.
*/
import React from "react";
import { Link } from "react-router";
import Loader from "./helpers/loader.jsx";
import BrowseArchives from "./browse_archives.jsx";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import HistoryService from "../../config/config.json";

class Institution extends React.Component {
  constructor(props) {
    super(props);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.state = { article: {}, user: {}, archive_id: "", loading: true };
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  On initial load, GET ONE Article from Article API
*/
  componentDidMount() {
    let myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });

    let myInit = { method: "GET", headers: myHeaders };
    let that = this;

    fetch("/api/articles/" + that.props.params.articleId, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          StatusAlertService.showError(response.error.message);
        } else {
          that.setState({ article: response.data });
        }
        that.setState({ loading: false });
      })
      .then(() => {
        let myHeaders = new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": window.localStorage.getItem("userToken")
        });

        let myInit = { method: "GET", headers: myHeaders };
        let that = this;

        fetch(
          `${HistoryService.USERSERVICE}/api/users/` +
            that.state.article[0].user_id,
          myInit
        )
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            if (response.error.error) {
              StatusAlertService.showError(response.error.message);
            } else {
              that.setState({ user: response.data });
            }
            that.setState({ loading: false });
          });
      });
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  deleteArticle() - takes id, sends Delete request to Article and redirects
  user back to home.
*/
  deleteArticle(e) {
    e.preventDefault();
    let del = confirm("Are you sure you want to delete this article?");

    if (del) {
      let myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem("userToken")
      });

      let myInit = {
        method: "DELETE",
        headers: myHeaders,
        body: "id=" + this.state.article[0].id
      };

      fetch("/api/articles/", myInit)
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
          if (response.error.error) {
            StatusAlertService.showError(response.error.message);
          } else {
            StatusAlertService.showSuccess("Article has been deleted");
            hashHistory.push("home");
          }
        });
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // archiveUpdate() - Clicking on archive sets the archive id to update in browse_archives
  archiveUpdate(id) {
    this.setState({ archive_id: id });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Renders the history page as well as the browse_archive and simple_article components.
  render() {
    let user_name = "";
    if (this.state.loading) return <Loader />;
    else
      return (
        <div className="container-fluid">
          <StatusAlert />
          <div className="row">
            <div className="col-md-3 article-info-box">
              <div className="card">
                <div
                  className="my-card-img-top"
                  dangerouslySetInnerHTML={{
                    __html: this.state.article[0].photo
                  }}
                ></div>
                <div className="list-group-item">
                  Image License
                  <p
                    id="Baskerville"
                    dangerouslySetInnerHTML={{
                      __html: this.state.article[0].photo_license
                    }}
                  ></p>
                </div>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    Last Updated By
                    <p id="Baskerville">{user_name}</p>
                  </li>
                  <li className="list-group-item">
                    <p id="FuturaStdHeavy">Holding Institution</p>
                    <p
                      id="Baskerville"
                      dangerouslySetInnerHTML={{
                        __html: this.state.article[0].institution
                      }}
                    ></p>
                  </li>

                  <li className="list-group-item">
                    <p id="FuturaStdHeavy">Type</p>
                    <p
                      id="Baskerville"
                      dangerouslySetInnerHTML={{
                        __html: this.state.article[0].artwork_type
                      }}
                    ></p>
                  </li>

                  <li className="list-group-item">
                    <p id="FuturaStdHeavy">Culture Group</p>
                    <p
                      id="Baskerville"
                      dangerouslySetInnerHTML={{
                        __html: this.state.article[0].culture_group
                      }}
                    ></p>
                  </li>

                  <li className="list-group-item">
                    <p id="FuturaStdHeavy">Material</p>
                    <p
                      id="Baskerville"
                      dangerouslySetInnerHTML={{
                        __html: this.state.article[0].material
                      }}
                    ></p>
                  </li>

                  <li className="list-group-item">
                    <p id="FuturaStdHeavy">Tags</p>
                    <p
                      id="Baskerville"
                      dangerouslySetInnerHTML={{
                        __html: this.state.article[0].tags
                      }}
                    ></p>
                  </li>

                  <li className="list-group-item">
                    <b>What Changed in last edit</b>
                    {this.state.article[0].what_changed ? (
                      <p id="Baskerville">
                        {this.state.article[0].what_changed}
                      </p>
                    ) : (
                      <p id="Baskerville">No information available</p>
                    )}
                  </li>
                </ul>

                {window.localStorage.getItem("admin") === "1" ? (
                  <button
                    className="btn btn-primary btn-block"
                    onClick={this.deleteArticle}
                  >
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="col-md-6 tabBar-content">
              <div className="tabBar row justify-content-between align-items-end">
                <nav aria-label="breadcrumb col">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Search</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a
                        href="#"
                        dangerouslySetInnerHTML={{
                          __html: this.state.article[0].artwork_type
                        }}
                      ></a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {this.state.article[0].title}
                    </li>
                  </ol>
                </nav>
                <div className="col tabBar-align">
                  <Link
                    to={"/article/history/" + this.state.article[0].id}
                    className="none-deco tabBar-tab history-tab"
                    aria-label="Histyory tab, go to see the history of this article"
                  >
                    Edit History
                  </Link>
                  <Link
                    to={"/article/edit/" + this.state.article[0].id}
                    className="none-deco tabBar-tab edit-tab"
                    aria-label="Edit tab, go to edit the article"
                  >
                    Edit
                  </Link>
                  <Link
                    to={"/article/institution/" + this.state.article[0].id}
                    className="bottom-align-text tabBar-tab institution-tab is-active"
                    aria-label="Artwork article tab, see the current published state of the article"
                  >
                    Institution
                  </Link>
                  <Link
                    to={"/article/" + this.props.params.articleId}
                    className="bottom-align-text tabBar-tab vpia-tab"
                    aria-label="Artwork article tab, see the current published state of the article"
                  >
                    VPIA
                  </Link>
                </div>
              </div>
              <div class="tab-bar-card">
                <div className="article-heading">
                  <h1 className="single-article-title">
                    {this.state.article[0].title}-{" "}
                    {this.state.article[0].institution} Record
                  </h1>
                  <div className="article-body"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Institution;
