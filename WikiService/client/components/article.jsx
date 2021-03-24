/* --------------------------------------------------------------------------------------------------------------------------------------------
  This component renders the main Wiki page Article and deals
  with all of the API needed.
*/
import React from "react";
import { Link, hashHistory } from "react-router";
import Loader from "./helpers/loader.jsx";
import InfoBox from "./infobox.jsx";
import StatusAlert, { StatusAlertService } from "react-status-alert";

class ViewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.deleteArchives = this.deleteArchives.bind(this);
    this.state = { article: {}, user: {}, loading: true };
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
          `${process.env.USERSERVICE}/api/users/` +
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
  async deleteArticle(e) {
    e.preventDefault();
    let del = confirm("Are you sure you want to delete this article?");

    if (del) {
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem("userToken")
      });

      let request = {
        method: "DELETE",
        headers: headers,
        body: "id=" + this.state.article[0].id
      };

      const res = await fetch("/api/articles/", request);
      const json = await res.json();
      if (json.error.error) {
        StatusAlertService.showError(json.error.message);
      } else {
        try {
          this.deleteArchives(headers, this.state.article[0].id);
        } catch (err) {
          StatusAlertService.showError(err);
        }
      }
    }
  }

  async deleteArchives(headers, article_id) {
    let request = {
      method: "DELETE",
      headers: headers,
      body: "id=" + article_id
    };

    const res = await fetch(
      `${process.env.HISTORYSERVICE}/api/articles/` + article_id + "/history",
      request
    );
    const json = await res.json();
    if (json.error.error) {
      StatusAlertService.showError(json.error.message);
    } else {
      StatusAlertService.showSuccess("Article and archives have been deleted");
      hashHistory.push("home");
    }
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  This renders all of the information relating to the Article as pulled from
  the database. If user is admin, more functions become available.
*/
  render() {
    let user_name = "";
    let article = [];
    if (this.state.loading) return <Loader />;
    else if (this.state.article[0] && this.state.article[0].user_id) {
      if (this.state.user[0]) {
        user_name = this.state.user[0].name;
      }
      if (this.state.article[0]) {
        article = this.state.article[0];
      }
      return (
        <div className="container-fluid">
          <StatusAlert />
          <div className="row">
            <InfoBox
              photo={article.photo}
              photo_license={article.photo_license}
              user_name={user_name}
              institution={article.institution}
              artwork_type={article.artwork_type}
              culture_group={article.culture_group}
              material={article.material}
              tags={article.tags}
              what_changed={article.what_changed}
              delete={this.deleteArticle}
              displayUser={true}
              displayDelete={true}
            />

            <div className="col-md-6 tabBar-content">
              <div className="tabBar row justify-content-between align-items-end">
                <nav aria-label="breadcrumb col">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">Search</li>
                    <li
                      className="breadcrumb-item"
                      dangerouslySetInnerHTML={{
                        __html: article.artwork_type
                      }}
                    ></li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {article.title}
                    </li>
                  </ol>
                </nav>
                <div className="col tabBar-align">
                  <Link
                    to={"/article/history/" + article.id}
                    className="none-deco tabBar-tab lightgrey-tab"
                    aria-label="Histyory tab, go to see the history of this article"
                  >
                    Edit History
                  </Link>
                  {window.localStorage.getItem("userToken") ? (
                    <Link
                      to={"/article/edit/" + article.id}
                      className="none-deco tabBar-tab yellow-tab"
                      aria-label="Edit tab, go to edit the article"
                    >
                      Edit
                    </Link>
                  ) : (
                    ""
                  )}
                  <Link
                    to={"/article/institution/" + article.id}
                    className="bottom-align-text tabBar-tab darkgrey-tab"
                    aria-label="Artwork article tab, see the current published state of the article"
                  >
                    Institution
                  </Link>
                  <Link
                    className="bottom-align-text tabBar-tab green-tab is-active"
                    aria-label="Artwork article tab, see the current published state of the article"
                  >
                    VPIA
                  </Link>
                </div>
              </div>
              <div className="tab-bar-card">
                <div className="article-heading">
                  <h1 className="single-article-title">
                    #{article.id}&nbsp;
                    {article.title}
                  </h1>
                  <div className="article-body">
                    <br />
                    <h3 className="single-article-title">Overview</h3>
                    <hr />
                    <div
                      className="single-article-body"
                      dangerouslySetInnerHTML={{
                        __html: article.body
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ViewArticle;
