/* --------------------------------------------------------------------------------------------------------------------------------------------
  Logic for the Article history button that displays the revision history of the platform.
*/
import React from "react";
import { Link } from "react-router";
import Loader from "./helpers/loader.jsx";
import BrowseArchives from "./browse_archives.jsx";
import InfoBox from "../../../WikiService/client/components/infobox.jsx";
import StatusAlert, { StatusAlertService } from "react-status-alert";

class Institution extends React.Component {
  constructor(props) {
    super(props);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.state = { article: {}, user: {}, archives: {}, loading: true };
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  On initial load, GET ONE Article from Article API and GET archives history
*/
  componentDidMount() {
    let myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });

    let myInit = { method: "GET", headers: myHeaders };
    let that = this;
    let article_url =
      `${process.env.HISTORYSERVICE}/api/articles/` +
      that.props.params.articleId +
      "/history";
    let archives_url = "/api/articles/" + that.props.params.articleId;

    Promise.all([fetch(archives_url, myInit), fetch(article_url, myInit)])
      .then(function(responses) {
        return Promise.all(
          responses.map(function(response) {
            return response.json();
          })
        );
      })
      .then(function(data) {
        const article = data[0];
        const archives = data[1];
        that.setState({
          article: article.data,
          archives: archives.data,
          loading: false
        });
      })

      .catch(function(error) {
        StatusAlertService.showError(response.error.message);
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
  // Renders the institution page.
  render() {
    let user_name = "";
    let article = [];
    if (this.state.loading) return <Loader />;
    else if (this.state.article[0]) {
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
            display={false}
          />
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
                        __html: article.artwork_type
                      }}
                    ></a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {article.title}
                  </li>
                </ol>
              </nav>
              <div className="col tabBar-align">
                <Link
                  to={"/article/history/" + article.id}
                  className="none-deco tabBar-tab history-tab"
                  aria-label="Histyory tab, go to see the history of this article"
                >
                  Edit History
                </Link>
                <Link
                  to={"/article/edit/" + article.id}
                  className="none-deco tabBar-tab edit-tab"
                  aria-label="Edit tab, go to edit the article"
                >
                  Edit
                </Link>
                <Link
                  to={"/article/institution/" + article.id}
                  className="bottom-align-text tabBar-tab institution-tab is-active"
                  aria-label="Artwork article tab, see the current published state of the article"
                >
                  Institution
                </Link>
                <Link
                  to={"/article/" + article.id}
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
                  {article.title}- {article.institution} Record
                </h1>

                <div
                  className="single-article-body"
                  dangerouslySetInnerHTML={{
                    __html: this.state.archives[this.state.archives.length - 1]
                      .body
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Institution;
