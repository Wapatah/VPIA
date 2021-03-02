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
    this.state = {
      body: "",
      title: "",
      culture_group: "",
      material: "",
      artwork_type: "",
      tags: "",
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

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // handleSubmit() - Build article object and send a PUT request to update the article.
  handleSubmit(e) {
    e.preventDefault();
    let body = this.state.body;
    let title = this.state.title;
    let what_changed = this.refs.what_changed.value;
    let culture_group = this.state.culture_group;
    let material = this.state.material;
    let artwork_type = this.state.artwork_type;
    let tags = this.state.tags;

    if (
      body &&
      title &&
      what_changed &&
      culture_group &&
      material &&
      artwork_type &&
      tags
    ) {
      let myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem("userToken")
      });
      let myInit = {
        method: "POST",
        headers: myHeaders,
        body:
          "article_id=" +
          this.props.params.articleId +
          "&title=" +
          encodeURIComponent(title) +
          "&body=" +
          encodeURIComponent(body) +
          "&culture_group=" +
          encodeURIComponent(culture_group) +
          "&institution=" +
          this.props.params.institution +
          "&photo=" +
          this.props.params.photo +
          "&material=" +
          encodeURIComponent(material) +
          "&artwork_type=" +
          encodeURIComponent(artwork_type) +
          "&tags=" +
          encodeURIComponent(tags) +
          "&user_id=" +
          window.localStorage.getItem("user_id") +
          "&what_changed=" +
          what_changed
      };

      let that = this;

      fetch(`${process.env.HISTORYSERVICE}/api/archives/`, myInit)
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
          if (response.error.error) {
            StatusAlertService.showError(response.error.message);
          } else {
            StatusAlertService.showSuccess(
              "Archive has been successfully created"
            );
          }
        })
        .then(() => {
          let myHeaders = new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": window.localStorage.getItem("userToken")
          });
          let myInit = {
            method: "PUT",
            headers: myHeaders,
            body:
              "id=" +
              this.props.params.articleId +
              "&title=" +
              encodeURIComponent(title) +
              "&body=" +
              encodeURIComponent(body) +
              "&culture_group=" +
              encodeURIComponent(culture_group) +
              "&material=" +
              encodeURIComponent(material) +
              "&artwork_type=" +
              encodeURIComponent(artwork_type) +
              "&tags=" +
              encodeURIComponent(tags) +
              "&user_id=" +
              window.localStorage.getItem("user_id") +
              "&what_changed=" +
              what_changed
          };

          let that = this;

          fetch("/api/articles/", myInit)
            .then(function(response) {
              return response.json();
            })
            .then(function(response) {
              if (response.error.error) {
                StatusAlertService.showError(response.error.message);
              } else {
                StatusAlertService.showSuccess(
                  "Article has been successfully saved"
                );
              }
            });
        });
      hashHistory.push("article/" + that.props.params.articleId);
    } else {
      StatusAlertService.showError(
        "Article Body, Title, and Change Info is required."
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
                    <h6>Type</h6>
                    <div>
                      <Editor
                        initialValue={this.state.artwork_type}
                        init={{
                          inline: true,
                          menubar: false,
                          plugins: Config.plugins,
                          toolbar: Config.toolbar,
                          quickbars_insert_toolbar: false,
                          quickbars_selection_toolbar: false
                        }}
                        onChange={editor => {
                          this.setState({
                            artwork_type: editor.level.content
                          });
                        }}
                      />
                    </div>
                  </li>

                  <li className="list-group-item">
                    <h6>Culture Group</h6>
                    <div>
                      <Editor
                        initialValue={this.state.culture_group}
                        init={{
                          inline: true,
                          menubar: false,
                          plugins: Config.plugins,
                          toolbar: Config.toolbar,
                          quickbars_insert_toolbar: false,
                          quickbars_selection_toolbar: false
                        }}
                        onChange={editor => {
                          this.setState({
                            culture_group: editor.level.content
                          });
                        }}
                      />
                    </div>
                  </li>

                  <li className="list-group-item">
                    <h6>Material</h6>
                    <div>
                      <Editor
                        initialValue={this.state.material}
                        init={{
                          inline: true,
                          menubar: false,
                          plugins: Config.plugins,
                          toolbar: Config.toolbar,
                          quickbars_insert_toolbar: false,
                          quickbars_selection_toolbar: false
                        }}
                        onChange={editor => {
                          this.setState({
                            material: editor.level.content
                          });
                        }}
                      />
                    </div>
                  </li>

                  <li className="list-group-item">
                    <h6>Tags</h6>
                    <div>
                      <Editor
                        initialValue={this.state.tags}
                        init={{
                          inline: true,
                          menubar: false,
                          plugins: Config.plugins,
                          toolbar: Config.toolbar,
                          quickbars_insert_toolbar: false,
                          quickbars_selection_toolbar: false
                        }}
                        onChange={editor => {
                          this.setState({
                            tags: editor.level.content
                          });
                        }}
                      />
                    </div>
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
                    className="none-deco tabBar-tab history-tab"
                    aria-label="Histyory tab, go to see the history of this article"
                  >
                    Edit History
                  </Link>
                  <Link
                    to={"/article/edit/" + this.state.article[0].id}
                    className="none-deco tabBar-tab edit-tab is-active"
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
                    to={"/article/" + this.state.article[0].id}
                    className="bottom-align-text tabBar-tab vpia-tab"
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
                      initialValue={this.state.body}
                      init={{
                        inline: true,
                        menubar: false,
                        automatic_uploads: true,
                        images_upload_url: process.env.IMAGEUPLOAD,
                        plugins: Config.plugins,
                        toolbar: Config.toolbar,
                        quickbars_insert_toolbar: false,
                        quickbars_selection_toolbar: false
                      }}
                      onChange={editor => {
                        this.setState({ body: editor.level.content });
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
