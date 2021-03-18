/* --------------------------------------------------------------------------------------------------------------------------------------------
  Logic for the Article history button that displays the revision history of the platform.
*/
import React from "react";
import { Link } from "react-router";
import Loader from "./helpers/loader.jsx";
import BrowseArchives from "./browse_archives.jsx";
import SimpleArticle from "./simple_article.jsx";

class ArticleHistory extends React.Component {
  constructor(props) {
    super(props);
    this.archiveUpdate = this.archiveUpdate.bind(this);
    this.state = { archive_id: "", loading: true };
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Onload, set loading to false
  componentDidMount() {
    this.setState({ loading: false });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // archiveUpdate() - Clicking on archive sets the archive id to update in browse_archives
  archiveUpdate(id) {
    this.setState({ archive_id: id });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Renders the history page as well as the browse_archive and simple_article components.
  render() {
    if (this.state.loading) return <Loader />;
    else
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 history-box">
              <BrowseArchives
                archiveChange={this.archiveUpdate}
                articleId={this.props.params.articleId}
              />
            </div>
            <div className="col-md-6 tabBar-content">
              <div className="tabBar row justify-content-between align-items-end">
                <nav aria-label="breadcrumb col">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Edit</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Edit History
                    </li>
                  </ol>
                </nav>
                <div className="col tabBar-align">
                  <Link
                    className="none-deco tabBar-tab lightgrey-tab is-active"
                    aria-label="Histyory tab, go to see the history of this article"
                  >
                    Edit History
                  </Link>
                  {window.localStorage.getItem("userToken") ? (
                    <Link
                      to={"/article/edit/" + this.props.params.articleId}
                      className="none-deco tabBar-tab yellow-tab"
                      aria-label="Edit tab, go to edit the article"
                    >
                      Edit
                    </Link>
                  ) : (
                    ""
                  )}
                  <Link
                    to={"/article/institution/" + this.props.params.articleId}
                    className="bottom-align-text tabBar-tab darkgrey-tab"
                    aria-label="Artwork article tab, see the current published state of the article"
                  >
                    Institution
                  </Link>
                  <Link
                    to={"/article/" + this.props.params.articleId}
                    className="bottom-align-text tabBar-tab green-tab"
                    aria-label="Artwork article tab, see the current published state of the article"
                  >
                    VPIA
                  </Link>
                </div>
              </div>
              <div class="tab-bar-card">
                <div className="article-heading">
                  <div className="article-body">
                    <SimpleArticle archiveId={this.state.archive_id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default ArticleHistory;
