/* --------------------------------------------------------------------------------------------------------------------------------------------
  Article/Artwork Edit logic - article leads here if you click edit.
*/
import React from "react";
import { Link, hashHistory } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import Loader from "./helpers/loader.jsx";

// Import TinyMCE
import { Editor } from "@tinymce/tinymce-react";

// Import Editor configurations - change general behaviour in the json, specific changes should be done in new.jsx and edit.jsx
import Config from "../../config/editor.json";

// Import automatic editor preview
import EditorPreview from "./helpers/editor_preview.jsx";

class EditArticle extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      body: "",
      title: "",
      culture_group: "",
      material: "",
      artwork_type: "",
      tags: "",
      what_changed: "",
      loading: true,
      isHidden: true
    };
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Onload, fetch GET ONE article
  componentDidMount() {
    let myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    let myInit = { method: "GET", headers: myHeaders };
    let that = this;

    fetch("/api/articles/" + this.props.params.articleId, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          StatusAlertService.showError(response.error.message);
        } else {
          that.setState({
            body: response.data[0].body,
            title: response.data[0].title,
            culture_group: response.data[0].culture_group,
            material: response.data[0].material,
            artwork_type: response.data[0].artwork_type,
            tags: response.data[0].tags,
            article: response.data
          });
        }
        that.setState({ loading: false });
      });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // toggleHidden() - Hide/unhide the editorpreview
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // handleChange() = Gets information from the editor and sets variables
  handleChange(data) {
    this.setState({ title: this.refs.title.value });
    this.refs.body.value = data.getData();
    this.setState({ body: this.refs.body.value });
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // handleSubmit() - Build article object and send a PUT request to update the article.
  async handleSubmit(e) {
    e.preventDefault();

    let record = {
      body: encodeURIComponent(this.state.body),
      title: encodeURIComponent(this.state.title),
      what_changed: encodeURIComponent(this.refs.what_changed.value),
      culture_group: encodeURIComponent(this.state.culture_group),
      material: encodeURIComponent(this.state.material),
      artwork_type: encodeURIComponent(this.state.artwork_type),
      tags: encodeURIComponent(this.state.tags)
    };

    let archiveMade = false;

    if (
      this.refs.what_changed.value &&
      this.state.title &&
      this.state.culture_group &&
      this.state.material &&
      this.state.artwork_type &&
      this.state.tags &&
      this.state.body
    ) {
      if (
        typeof this.state.imageEditorBody !== "undefined" ||
        this.state.imageEditorBody !== null
      ) {
        const bodyImageUpload = this.state.imageEditorBody.target.editorUpload.uploadImages();
        await bodyImageUpload;
      }
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem("userToken")
      });
      let archive_request = {
        method: "POST",
        headers: headers,
        body:
          "article_id=" +
          this.props.params.articleId +
          "&title=" +
          record.title +
          "&body=" +
          record.body +
          "&culture_group=" +
          record.culture_group +
          "&institution=" +
          this.props.params.institution +
          "&photo=" +
          this.props.params.photo +
          "&material=" +
          record.material +
          "&artwork_type=" +
          record.artwork_type +
          "&tags=" +
          record.tags +
          "&user_id=" +
          window.localStorage.getItem("user_id") +
          "&what_changed=" +
          record.what_changed
      };

      const archive_res = await fetch(
        `${process.env.HISTORYSERVICE}/api/archives/`,
        archive_request
      );
      const archive_json = await archive_res.json();
      if (archive_json.error.error) {
        StatusAlertService.showError(archive_json.error.message);
      } else {
        archiveMade = true;
      }

      if (archiveMade) {
        let article_request = {
          method: "PUT",
          headers: headers,
          body:
            "id=" +
            this.props.params.articleId +
            "&title=" +
            record.title +
            "&body=" +
            record.body +
            "&culture_group=" +
            record.culture_group +
            "&material=" +
            record.material +
            "&artwork_type=" +
            record.artwork_type +
            "&tags=" +
            record.tags +
            "&user_id=" +
            window.localStorage.getItem("user_id") +
            "&what_changed=" +
            record.what_changed
        };

        let that = this;

        const article_res = await fetch("/api/articles/", article_request);
        const article_json = await article_res.json();
        if (article_json.error.error) {
          StatusAlertService.showError(article_json.error.message);
        } else {
          StatusAlertService.showSuccess(
            "Article & Archive have been successfully saved"
          );
          hashHistory.push("article/" + that.props.params.articleId);
        }
      } else {
        StatusAlertService.showError(
          "Something went wrong creating an Archive."
        );
      }
    } else {
      StatusAlertService.showError(
        "What Changed needs to be filled out and some kind of modification is required to update this record."
      );
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Renders the editing article page with some modifiable elements.
  render() {
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
                  <h6>Image License</h6>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: this.state.article[0].photo_license
                    }}
                  ></p>
                </div>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h6>Holding Institution</h6>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: this.state.article[0].institution
                      }}
                    ></p>
                  </li>

                  <li className="list-group-item">
                    <p id="FuturaStdHeavy">Type</p>
                    <p id="Baskerville">
                      <input
                        name="artwork_type"
                        value={this.state.artwork_type}
                        onChange={this.onInputChange}
                        className="form-control input-title"
                        placeholder="e.g. pipe, sculpture, etc."
                      />
                    </p>
                  </li>

                  <li className="list-group-item">
                    <p id="FuturaStdHeavy">Culture Group</p>
                    <p id="Baskerville">
                      <input
                        name="culture_group"
                        value={this.state.culture_group}
                        onChange={this.onInputChange}
                        className="form-control input-title"
                        placeholder="Cultural group the artwork belongs to"
                      />
                    </p>
                  </li>

                  <li className="list-group-item">
                    <p id="FuturaStdHeavy">Material</p>
                    <p id="Baskerville">
                      <input
                        name="material"
                        value={this.state.material}
                        onChange={this.onInputChange}
                        className="form-control input-title"
                        placeholder="e.g. argilite, silver, etc."
                      />
                    </p>
                  </li>

                  <li className="list-group-item">
                    <p id="FuturaStdHeavy">Tags</p>
                    <p id="Baskerville">
                      <input
                        name="tags"
                        value={this.state.tags}
                        onChange={this.onInputChange}
                        className="form-control input-title"
                        placeholder="e.g. boat, fish, etc."
                      />
                    </p>
                  </li>

                  <li className="list-group-item">
                    <div className="whatwrapper">
                      <label>What Changed?</label>
                      <textarea
                        ref="what_changed"
                        className="form-control what_changed what"
                        id="what"
                        placeholder="Example: Fixed a typo. It's grammer not grammar"
                      />
                      <p className="help-block">
                        Keep it short and descriptive.
                      </p>
                    </div>
                  </li>
                </ul>

                <button
                  className="btn btn-default btn-block btn-lg"
                  onClick={this.handleSubmit}
                >
                  Update Article
                </button>
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
                    className="none-deco tabBar-tab lightgrey-tab"
                    aria-label="Histyory tab, go to see the history of this article"
                  >
                    Edit History
                  </Link>
                  {window.localStorage.getItem("userToken") ? (
                    <Link
                      to={"/article/edit/" + this.state.article[0].id}
                      className="none-deco tabBar-tab yellow-tab is-active"
                      aria-label="Edit tab, go to edit the article"
                    >
                      Edit
                    </Link>
                  ) : (
                    ""
                  )}
                  <Link
                    to={"/article/institution/" + this.state.article[0].id}
                    className="bottom-align-text tabBar-tab darkgrey-tab"
                    aria-label="Artwork article tab, see the current published state of the article"
                  >
                    Institution
                  </Link>
                  <Link
                    to={"/article/" + this.state.article[0].id}
                    className="bottom-align-text tabBar-tab green-tab"
                    aria-label="Artwork article tab, see the current published state of the article"
                  >
                    VPIA
                  </Link>
                </div>
              </div>
              <div className="tab-bar-card">
                <div className="article-heading">
                  <h1 className="single-article-title">
                    #{this.state.article[0].id}&nbsp;
                    {this.state.article[0].title}
                  </h1>
                  <div className="article-body">
                    <br />
                    <h3 className="single-article-title">Overview</h3>
                    <hr />
                    <Editor
                      id="mainEditor"
                      initialValue={this.state.body}
                      init={{
                        inline: false,
                        menubar: false,
                        images_upload_url: process.env.IMAGEUPLOAD,
                        plugins: Config.plugins,
                        toolbar: Config.toolbar,
                        quickbars_insert_toolbar: false,
                        quickbars_selection_toolbar: false,
                        a11y_advanced_options: true,
                        image_caption: true,
                        images_reuse_filename: true,
                        paste_data_images: true,
                        automatic_uploads: false,
                        images_dataimg_filter: function(img) {
                          return !img.hasAttribute("internal-blob");
                        }
                      }}
                      onChange={editor => {
                        this.setState({ body: editor.level.content });
                        this.setState({ imageEditorBody: editor });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default EditArticle;
