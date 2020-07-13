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
    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    var myInit = { method: "GET", headers: myHeaders };
    var that = this;

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
    var body = this.state.body;
    var title = this.state.title;
    var what_changed = this.refs.what_changed.value;
    var culture_group = this.state.culture_group;
    var material = this.state.material;
    var artwork_type = this.state.artwork_type;
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
      var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem("userToken")
      });
      var myInit = {
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

      var that = this;

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
            hashHistory.push("article/" + that.props.params.articleId);
          }
        });
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
        <div>
          <StatusAlert />
          <div id="article-nav" className="container-fluid">
            <div className="col-md-5 col-centered">
              <div id="article-nav-inner" className="row align-items-end">
                <div className="col">
                  <a className="bottom-align-text">
                    <svg
                      width="15%"
                      height="15%"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 332.72 167.71"
                    >
                      <path
                        d="M1065.52,122.66c-1.27.62-2.79,1-3.77,1.89-4.51,4.26-8.48,9.18-13.38,12.9-5.66,4.3-12.68,6.89-18.05,11.45-9.47,8-20.36,8.23-31.6,7.59-1,0-2.58-2-2.72-3.15-0.71-6.35-1.16-12.74-1.48-19.12-0.67-13-.73-26.09-2-39-0.5-5-2.06-10.89-7.11-13.76-3.43-2-7.58-2.82-11.51-3.71a110,110,0,0,0-12.91-2c-6.42-.66-12.86-1.29-19.31-1.47-5.19-.15-10.43.81-15.61,0.55-17.93-.88-35.84-2.08-53.75-3.17-0.8,0-1.6-.12-2.39-0.18l-11.65-.91c-7.71-.6-15.43-1.09-23.13-1.85a100.56,100.56,0,0,1-14.81-2.2c-4.23-1.07-8.27.42-8.62,4.83-1,12.42-3,24.85-.28,37.35,1.59,7.28-1.78,11.89-8.53,13.49-4.58,1.08-9.43,2.3-13.32,4.76-10.14,6.42-20.35,12.8-28.81,21.6-6.63,6.9-13.94,13.14-20.84,19.79a51,51,0,0,0-6.27,7.26c-0.51.72,0.32,2.38,0.54,3.6a11.62,11.62,0,0,0,2.61-1.32c4.71-4.18,8.84-9.28,14.12-12.51,17.29-10.57,35-20.43,56.14-20.79,2.74,0,5.1.67,5.22,4,0.16,3.88,0,7.76.11,11.64,0.26,8.29.51,16.59,1,24.87,0.47,8.83,1.6,17.64,1.61,26.47,0,7.84,5.26,15.35,13.2,16.53,11.46,1.72,23,3.21,34.46,4.63a147.6,147.6,0,0,0,15,1.16c7.76,0.16,15.52,0,23.28-.06,14.88-.11,29.76-0.28,44.64-0.34,12.44-.06,24.88,0,37.32,0,7.45,0,11.3-4.45,10.63-11.54-0.52-5.5-.66-11-0.63-16.57,0-4.21.86-8.41,0.86-12.61,0-4.58,2.28-6.46,6.42-7.6a84.33,84.33,0,0,0,25-11.92,13,13,0,0,0,2.71-1.72c7.12-5.25,15.57-9.41,21-16,7-8.45,11.65-18.84,17.11-28.51C1066.58,125.9,1065.72,124.09,1065.52,122.66Zm-91.88,93.68a24,24,0,0,1-10,2c-8.67-.06-17.33-0.85-26-0.92-16-.15-32,0.16-48,0-4.64-.06-9.24-1.48-13.89-1.91-9.61-.9-19.25-1.55-28.88-2.3a15.78,15.78,0,0,0-3.34-.23c-5.45.78-7.43-.18-7.84-5-0.79-9.44-1.12-18.92-1.71-28.37-0.55-8.67-1.25-17.33-1.76-26a16.82,16.82,0,0,1,.75-4.07c8.91-1.59,16.45,2,24.07,4.36,10.78,3.31,21.24,7.7,31.74,11.88,10.2,4,20.2,8.57,30.4,12.61,11,4.35,22,8.68,34,9.51a156.6,156.6,0,0,1,17.22,2.36,4.47,4.47,0,0,1,3,2.94c0.51,5.5.62,11,.74,16.57C974.17,212,974.63,215.88,973.64,216.34ZM832,132.84c0.11-1.12.5-2.65,1.33-3.17a8.5,8.5,0,0,1,4.29-1c14.89-.12,29.12,3.22,42.91,8.54,14.83,5.73,29.47,11.94,44.38,17.4,8.74,3.2,17.84,5.43,26.82,8,5.39,1.52,10.82,2.92,16.29,4.15,4.06,0.91,3.73,3.82,3.15,6.61s-2.88,3.27-5.49,2.89c-11.05-1.57-22-3.63-32.4-7.75-10.88-4.31-21.57-9.11-32.34-13.7-9.91-3.34-18.93-6.45-27.8-9.91-12.59-4.92-25.29-9.31-38.84-10.75C833.43,134,831.94,133.2,832,132.84ZM974.31,97.27c-0.69,7.05-1.15,14.13-1.7,21.2,0,4.14-.65,7.74-0.84,11.37-0.33,6.1-.54,12.22-0.46,18.33,0.06,4.32-2.31,4.79-5.48,3.92-8.41-2.31-16.94-4.34-25.12-7.33-17.86-6.52-35.37-14-53.34-20.19-9.38-3.23-18.61-7.06-28.86-8.11-8.16-.83-16.09-2.27-24.29-0.74-0.76.14-2.63-1.44-2.67-2.28-0.33-6.79-.35-13.59-0.44-20.4,0-.79.17-1.59,0.17-2.39,0-7.79,0-7.91,7.74-7.15,8.95,0.88,17.85,2.28,26.8,3,10.56,0.8,21.15,1.12,31.73,1.57,7.06,0.31,14.14.27,21.2,0.75,14.41,1,28.8,2.26,43.21,3.3,2.43,0.17,4.89-.27,7.33-0.34C973.07,91.64,974.69,93.37,974.31,97.27Z"
                        transform="translate(-733.48 -66.14)"
                        className="small-icon"
                      />
                    </svg>
                    Artwork Article
                  </a>
                </div>
                <div className="col text-right bottom-align-text  active-red">
                  <i className="fa fa-edit"></i>Edit
                </div>
                <div className="col text-right bottom-align-text">
                  <i className="fa fa-history"></i>View History
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="left-side col-md-1 left-side-nav-card"></div>

            <div className="col-md-8 edit-indicator">
              <div className="article-heading">
                <h1 className="single-article-title">{this.state.title}</h1>
                <div className="single-article-meta">Created on </div>
                <div className="single-article-meta">Last updated on </div>

                <div className="row">
                  <div id="article-body" className="col-md-1">
                    <br />
                    <h3>Body</h3>
                    <hr />
                    <div id="article-photo" className="single-article-body">
                      <Editor
                        initialValue={this.state.body}
                        init={{
                          inline: true,
                          menubar: false,
                          automatic_uploads: true,
                          images_upload_url: Config.imageUrl,
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

                  <div className="col-md-4 article-info-box">
                    <div className="card">
                      <div
                        className="my-card-img-top"
                        dangerouslySetInnerHTML={{
                          __html: this.state.article[0].photo
                        }}
                      ></div>

                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          License
                          <p
                            id="Baskerville"
                            dangerouslySetInnerHTML={{
                              __html: this.state.article[0].photo_license
                            }}
                          ></p>
                        </li>

                        <li className="list-group-item">
                          Last Updated By
                          <p id="Baskerville"></p>
                          <p id="Baskerville"></p>
                        </li>

                        <li className="list-group-item">
                          <p id="FuturaStdHeavy">Holding Institution</p>
                          <p
                            id="Baskerville"
                            dangerouslySetInnerHTML={{
                              __html: this.state.article[0].institution
                            }}
                          ></p>
                        </li>

                        <li className="list-group-item">
                          <p id="FuturaStdHeavy">Type</p>
                          <p id="Baskerville">
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
                          </p>
                        </li>

                        <li className="list-group-item">
                          <p id="FuturaStdHeavy">Culture Group</p>
                          <p id="Baskerville">
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
                          </p>
                        </li>

                        <li className="list-group-item">
                          <p id="FuturaStdHeavy">Material</p>
                          <p id="Baskerville">
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
                          </p>
                        </li>

                        <li className="list-group-item">
                          <p id="FuturaStdHeavy">Tags</p>
                          <p id="Baskerville">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default EditArticle;