/* --------------------------------------------------------------------------------------------------------------------------------------------
  Logic for the Article history button that displays the revision history of the platform.
*/
import React from "react";
import { Link } from "react-router";
import Loader from "./helpers/loader.jsx";
import InfoBox from "../../../WikiService/client/components/infobox.jsx";
import StatusAlert, { StatusAlertService } from "react-status-alert";
// Import Editor configurations - change general behaviour in the json, specific changes should be done in new.jsx and edit.jsx
import Config from "../../config/editor.json";
// TinyMCE Editor import
import { Editor } from "@tinymce/tinymce-react";

class Institution extends React.Component {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      article: {},
      archives: {},
      title: "",
      body: "",
      edit: true,
      loading: true
    };
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

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    let record = {
      title: encodeURIComponent(this.state.title),
      body: encodeURIComponent(this.state.body)
    };

    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });

    let that = this;

    let request = {
      method: "PUT",
      headers: headers,
      body:
        "article_id=" +
        that.props.params.articleId +
        "&title=" +
        record.title +
        "&body=" +
        record.body
    };

    let institution_url =
      `${process.env.HISTORYSERVICE}/api/articles/` +
      that.props.params.articleId +
      "/history";

    const res = await fetch(institution_url, request);
    const json = await res.json();
    if (json.error.error) {
      StatusAlertService.showError(json.error.message);
    } else {
      StatusAlertService.showSuccess("Institution Record Updated Successfully");
      this.setState({ edit: true });
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Renders the institution page.
  render() {
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
              {window.localStorage.getItem("admin") === "1" ? (
                <button
                  className="btn btn-text float-right"
                  type="button"
                  aria-label="Edit Institution Record"
                  onClick={this.toggleEdit}
                >
                  {this.state.edit ? (
                    <i className="fa fa-edit"></i>
                  ) : (
                    <i className="fa fa-pencil"></i>
                  )}
                </button>
              ) : (
                ""
              )}
              <div className="article-heading">
                {this.state.edit ? (
                  <h1 className="single-article-title">
                    {archive.title}- {archive.institution} Record
                  </h1>
                ) : (
                  <h1 className="single-article-title">
                    <input
                      name="title"
                      value={this.state.title}
                      onChange={this.onInputChange}
                      className="form-control"
                      placeholder="Change Institution title"
                    />
                    - {archive.institution} Record
                  </h1>
                )}
                {this.state.edit ? (
                  <div
                    className="single-article-body"
                    type={this.state.edit ? "password" : "text"}
                    dangerouslySetInnerHTML={{
                      __html: archive.body
                    }}
                  ></div>
                ) : (
                  <Editor
                    initialValue={archive.body}
                    init={{
                      inline: false,
                      menubar: false,
                      automatic_uploads: true,
                      images_upload_url: process.env.IMAGEUPLOAD,
                      plugins: Config.plugins,
                      toolbar: Config.toolbar,
                      quickbars_insert_toolbar: false,
                      quickbars_selection_toolbar: false,
                      a11y_advanced_options: true,
                      image_caption: true,
                      images_reuse_filename: true,
                      paste_data_images: true
                    }}
                    onChange={editor => {
                      this.setState({ body: editor.level.content });
                    }}
                  />
                )}
                {this.state.edit ? (
                  ""
                ) : (
                  <button
                    className="btn btn-default btn-block btn-lg"
                    onClick={this.handleSubmit}
                  >
                    Update Institution Record
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Institution;
