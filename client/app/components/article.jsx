import React from "react";
import { Link, hashHistory } from "react-router";
import Loader from "./loader.jsx";
//import Alert from "react-s-alert";

class ViewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.state = { article: {}, loading: true };
  }

  componentDidMount() {
    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    var myInit = { method: "GET", headers: myHeaders };
    var that = this;
    fetch("/api/articles/" + that.props.params.articleId, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
        } //Alert.error(response.error.message);
        else {
          that.setState({ article: response.data });
        }
        that.setState({ loading: false });
      });
  }

  deleteArticle(e) {
    e.preventDefault();
    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    var myInit = {
      method: "DELETE",
      headers: myHeaders,
      body: "id=" + this.state.article[0].id
    };
    var that = this;
    fetch("/api/articles/", myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
        } //Alert.error(response.error.message);
        else {
          //Alert.success("Article has been deleted");
          hashHistory.push("home");
        }
      });
  }

  render() {
    if (this.state.loading) return <Loader />;
    else if (
      this.state.article[0] &&
      this.state.article[0].topic_id &&
      this.state.article[0].user_id
    ) {
      return (
        <div>
          <div className="row">
            <div className="col-md-9">
              <div className="article-heading">
                <h1 className="single-article-title">
                  {this.state.article[0].title}
                </h1>
                <div className="single-article-meta">
                  Created on{" "}
                  {new Date(
                    this.state.article[0].created_at.replace(" ", "T")
                  ).toUTCString()}
                </div>
                <div className="single-article-meta">
                  Last updated on{" "}
                  {new Date(
                    this.state.article[0].updated_at.replace(" ", "T")
                  ).toUTCString()}
                </div>
              </div>
              <div
                className="single-article-body"
                dangerouslySetInnerHTML={{ __html: this.state.article[0].body }}
              ></div>
            </div>
            <div className="col-md-3 article-sidebar">
              <div className="sidebar-block">
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.article[0].photo
                  }}
                ></div>
              </div>
              <div className="sidebar-block">
                <div className="sidebar-title">License</div>
                <h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.article[0].photo_license
                    }}
                  ></div>
                </h3>
              </div>
              <div className="sidebar-block">
                <div className="sidebar-title">Last Updated By</div>
                <h3 className="color-text">
                  <b>{this.state.article[0].user_id[0].name}</b>
                </h3>
                <p>{this.state.article[0].user_id[0].about}</p>
              </div>
              <div className="sidebar-block">
                <div className="sidebar-title">Holding Institution</div>
                <h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.article[0].institution
                    }}
                  ></div>
                </h3>
              </div>
              <div className="sidebar-block">
                <div className="sidebar-title">Type</div>
                <h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.article[0].artwork_type
                    }}
                  ></div>
                </h3>
              </div>
              <div className="sidebar-block">
                <div className="sidebar-title">Culture Group</div>
                <h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.article[0].culture_group
                    }}
                  ></div>
                </h3>
              </div>
              <div className="sidebar-block">
                <div className="sidebar-title">Material</div>
                <h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.article[0].material
                    }}
                  ></div>
                </h3>
              </div>
              <div className="sidebar-block">
                <div className="sidebar-title">What Changed in last edit</div>
                {this.state.article[0].what_changed ? (
                  <h4>{this.state.article[0].what_changed}</h4>
                ) : (
                  <h4>No information available</h4>
                )}
              </div>
              <Link
                to={"/article/edit/" + this.state.article[0].id}
                className="btn btn-default btn-block btn-lg"
              >
                Edit
              </Link>
              <Link
                to={"/article/history/" + this.state.article[0].id}
                className="btn btn-default btn-block btn-lg"
              >
                History
              </Link>
              {window.localStorage.getItem("admin") === "1" ? (
                <button
                  className="btn btn-default btn-block btn-lg"
                  onClick={this.deleteArticle}
                >
                  Delete
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ViewArticle;
