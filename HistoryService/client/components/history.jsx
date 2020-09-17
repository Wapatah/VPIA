/* --------------------------------------------------------------------------------------------------------------------------------------------
  Logic for the Article history button that displays the revision history of the platform.
*/
import React from "react";
import { Link } from "react-router";
import Loader from "./helpers/loader.jsx";
import BrowseArchives from "./browse_archives.jsx";

class ArticleHistory extends React.Component {
  constructor(props) {
    super(props);
    this.archiveUpdate = this.archiveUpdate.bind(this);
    this.state = { archive_id: "", user: {}, loading: true };
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
    let user_name = "";
    if (this.state.loading) return <Loader />;
    else if (this.state.article[0] && this.state.article[0].user_id) {
      if (this.state.user[0]) {
        user_name = this.state.user[0].name;
        user_about = this.state.user[0].about;
      } else
        return (
          <div className="container-fluid">
            <StatusAlert />
            <div className="row">
              <div className="col-md-6 tabBar-content">
                <div className="tabBar row justify-content-between align-items-end">
                  <nav aria-label="breadcrumb col">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="#">Edit</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a
                          href="#"
                          dangerouslySetInnerHTML={{
                            __html: this.state.article[0].artwork_type
                          }}
                        ></a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        {this.state.article[0].title}
                      </li>
                    </ol>
                  </nav>
                  <div className="col tabBar-align">
                    <Link
                      className="none-deco tabBar-tab history-tab is-active"
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
                      className="bottom-align-text tabBar-tab institution-tab"
                      aria-label="Artwork article tab, see the current published state of the article"
                    >
                      Institution
                    </Link>
                    <Link
                      to={"/article/" + this.props.params.articleId}
                      className="bottom-align-text tabBar-tab vpia-tab is-active"
                      aria-label="Artwork article tab, see the current published state of the article"
                    >
                      VPIA
                    </Link>
                  </div>
                </div>
                <div class="tab-bar-card">
                  <div className="article-heading">
                    <h1 className="single-article-title">
                      Edited by {this.state.article[0].user_id[0].name}
                    </h1>
                    on{" "}
                    {new Date(
                      this.state.article[0].updated_at.replace(" ", "T")
                    ).toUTCString()}
                    <div className="article-body">
                      <br />
                      <h3 className="single-article-title">Overview</h3>
                      <hr />
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

export default ArticleHistory;
