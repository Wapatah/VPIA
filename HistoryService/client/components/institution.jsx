/* --------------------------------------------------------------------------------------------------------------------------------------------
  Logic for the Article history button that displays the revision history of the platform.
*/
import React from "react";
import { Link } from "react-router";
import Loader from "./helpers/loader.jsx";
import InfoBox from "../../../WikiService/client/components/infobox.jsx";
import StatusAlert, { StatusAlertService } from "react-status-alert";

class Institution extends React.Component {
  constructor(props) {
    super(props);
    this.state = { article: {}, archives: {}, loading: true };
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  On initial load, GET ONE Article from Article API and GET archives history
*/
  async componentDidMount() {
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });

    let request = { method: "GET", headers: headers };
    let that = this;

    let article_url =
      `${process.env.HISTORYSERVICE}/api/articles/` +
      that.props.params.articleId +
      "/history";
    let archives_url = "/api/articles/" + that.props.params.articleId;

    let response = await Promise.all([
      fetch(archives_url, request),
      fetch(article_url, request)
    ]);
    let json = await Promise.all(
      response.map(result => {
        return result.json();
      })
    );
    const article = json[0];
    const archives = json[1];
    if (article.error.error) {
      StatusAlertService.showError(article.error.message);
    } else if (archives.error.error) {
      StatusAlertService.showError(archives.error.message);
    } else {
      that.setState({
        article: article.data,
        archives: archives.data,
        loading: false
      });
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Renders the institution page.
  render() {
    let user_name = "";
    let article = [],
      archive = [];
    if (this.state.loading) return <Loader />;
    else if (
      this.state.article[0] &&
      this.state.archives[this.state.archives.length - 1]
    ) {
      article = this.state.article[0];
      archive = this.state.archives[this.state.archives.length - 1];
    }
    return (
      <div className="container-fluid">
        <StatusAlert />
        <div className="row">
          <InfoBox
            photo={archive.photo}
            photo_license={archive.photo_license}
            institution={archive.institution}
            artwork_type={archive.artwork_type}
            culture_group={archive.culture_group}
            material={archive.material}
            tags={archive.tags}
            what_changed={archive.what_changed}
            display={false}
            displayDelete={false}
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
                  className="none-deco tabBar-tab lightgrey-tab"
                  aria-label="Histyory tab, go to see the history of this article"
                >
                  Edit History
                </Link>
                <Link
                  to={"/article/edit/" + article.id}
                  className="none-deco tabBar-tab yellow-tab"
                  aria-label="Edit tab, go to edit the article"
                >
                  Edit
                </Link>
                <Link
                  to={"/article/institution/" + article.id}
                  className="bottom-align-text tabBar-tab darkgrey-tab is-active"
                  aria-label="Artwork article tab, see the current published state of the article"
                >
                  Institution
                </Link>
                <Link
                  to={"/article/" + article.id}
                  className="bottom-align-text tabBar-tab green-tab"
                  aria-label="Artwork article tab, see the current published state of the article"
                >
                  VPIA
                </Link>
              </div>
            </div>
            <div class="tab-bar-card">
              <div className="article-heading">
                <h1 className="single-article-title">
                  {archive.title}- {archive.institution} Record
                </h1>

                <div
                  className="single-article-body"
                  dangerouslySetInnerHTML={{
                    __html: archive.body
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
