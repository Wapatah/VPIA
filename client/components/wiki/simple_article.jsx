/* --------------------------------------------------------------------------------------------------------------------------------------------
  This is a reduced Article display for the purposes of showing the differences between different article revisions (through Article History).
*/
import React from "react";
import { Link } from "react-router";
import Loader from "../helpers/loader.jsx";
import StatusAlert, { StatusAlertService } from "react-status-alert";

class SimpleArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { article: {} };
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Receives clicked archive and its id to display the simple article associated with it.
  componentWillReceiveProps(nextProps) {
    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    var myInit = { method: "GET", headers: myHeaders };
    var that = this;

    fetch("/api/archives/" + nextProps.archiveId, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          StatusAlertService.showError(response.error.message);
        } else {
          that.setState({ article: response.data });
        }
      });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Displays the article information in smaller detail.
  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.article[0] && this.state.article[0].user_id) {
      return (
        <div className="row">
          <StatusAlert />
          <div className="col-md-8">
            <div className="article-heading">
              <div
                id="article-photo"
                className="col-12"
                dangerouslySetInnerHTML={{
                  __html: this.state.article[0].photo
                }}
              ></div>
              <br />
              <h1 className="single-article-title">
                {this.state.article[0].title}
              </h1>
              <div className="single-article-meta">
                Edited by <b>{this.state.article[0].user_id[0].name}</b>
              </div>
              <br />
              <div className="single-article-meta">
                Holding Institution:{" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.article[0].institution
                  }}
                ></div>
              </div>
              <div className="single-article-meta">
                License:
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.article[0].photo_license
                  }}
                ></div>
              </div>
              <div className="single-article-meta">
                Type:{" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.article[0].artwork_type
                  }}
                ></div>
              </div>
              <div className="single-article-meta">
                Material:{" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.article[0].material
                  }}
                ></div>
              </div>
              <div className="single-article-meta">
                Culture Group:{" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.article[0].culture_group
                  }}
                ></div>
              </div>
            </div>
            <div
              className="single-article-body"
              dangerouslySetInnerHTML={{ __html: this.state.article[0].body }}
            ></div>
          </div>
        </div>
      );
    } else {
      return (
        <center>
          <p className="help-block">Please select the archive</p>
        </center>
      );
    }
  }
}

export default SimpleArticle;
