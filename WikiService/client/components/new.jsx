/* --------------------------------------------------------------------------------------------------------------------------------------------
  This is where the Admin can manually create new artwork pages. Regular users will not be allowed to create their own pages.
*/

import React from "react";
import { hashHistory } from "react-router";
import Loader from "./helpers/loader.jsx";
import StatusAlert, { StatusAlertService } from "react-status-alert";

// TinyMCE Editor import
import { Editor } from "@tinymce/tinymce-react";

// Import Editor configurations - change general behaviour in the json, specific changes should be done in new.jsx and edit.jsx
import Config from "../../config/editor.json";

// Importing editor preview helper
import EditorPreview from "./helpers/editor_preview.jsx";

class NewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      title: "",
      body: "",
      culture_group: "",
      material: "",
      photo: "",
      photo_license: "",
      artwork_type: "",
      institution: "",
      tags: "",
      error: "",
      loading: true
    };
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Take variables from admin input and create a new Article object and send POST
  handleSubmit(e) {
    e.preventDefault();
    let body = this.state.body;
    let title = this.state.title;
    let culture_group = this.state.culture_group;
    let material = this.state.material;
    let artwork_type = this.state.artwork_type;
    let photo = this.state.photo;
    let institution = this.state.institution;
    let photo_license = this.state.photo_license;
    let tags = this.state.tags;

    if (
      body &&
      title &&
      culture_group &&
      material &&
      artwork_type &&
      institution &&
      photo &&
      photo_license &&
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
          "title=" +
          encodeURIComponent(title) +
          "&body=" +
          encodeURIComponent(body) +
          "&culture_group=" +
          encodeURIComponent(culture_group) +
          "&material=" +
          encodeURIComponent(material) +
          "&artwork_type=" +
          encodeURIComponent(artwork_type) +
          "&photo=" +
          encodeURIComponent(photo) +
          "&tags=" +
          encodeURIComponent(tags) +
          "&institution=" +
          encodeURIComponent(institution) +
          "&photo_license=" +
          encodeURIComponent(photo_license) +
          "&user_id=" +
          window.localStorage.getItem("user_id")
      };

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
            hashHistory.push("article/" + response.data.id + "?new=true");
          }
        });
    } else {
      StatusAlertService.showError(
        "Article Body, Title and Information is required."
      );
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Render the create article page
  render() {
    return (
      <div className="container-fluid">
        <StatusAlert />
        <div className="row">
          <div className="col-md-3 article-info-box">
            <div className="card">
              <div className="my-card-img-top">
                <Editor
                  initialValue='<img src="../../assets/images/logo.png">'
                  init={{
                    inline: true,
                    menubar: false,
                    images_upload_url: process.env.IMAGEUPLOAD,
                    plugins: ["image"],
                    toolbar: "image | help"
                  }}
                  onChange={editor => {
                    this.setState({ photo: editor.level.content });
                  }}
                />
              </div>
              <div className="list-group-item">
                License
                <p id="Baskerville">
                  <input
                      name="photo_license"
                      value={this.state.photo_license}
                      onChange={this.onInputChange}
                      className="form-control input-title"
                      placeholder="License for the main image"
                    />
                </p>
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">Last Updated By</li>
                <li className="list-group-item">
                  <p id="FuturaStdHeavy">Holding Institution</p>
                  <p id="Baskerville">
                    <input
                        name="institution"
                        value={this.state.institution}
                        onChange={this.onInputChange}
                        className="form-control input-title"
                        placeholder="Where the artwork currently resides"
                      />
                  </p>
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
                  <b>What Changed in last edit</b>
                  <p id="Baskerville">No information available</p>
                </li>
              </ul>

              {window.localStorage.getItem("admin") === "1" ? (
                <button
                  className="btn btn-default btn-block btn-lg"
                  onClick={this.handleSubmit}
                >
                  Create Article
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="col-md-6 tabBar-content">
            <div className="tabBar row justify-content-between align-items-end">
              <nav aria-label="breadcrumb col">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Create</a>
                  </li>
                  <li className="breadcrumb-item">New Artwork</li>
                </ol>
              </nav>
              <div className="col tabBar-align">
                <div
                  className="bottom-align-text tabBar-tab vpia-tab is-active"
                  aria-label="Artwork article tab, see the current published state of the article"
                >
                  VPIA
                </div>
              </div>
            </div>{" "}
            <div className="tab-bar-card">
              <div className="edit-indicator">
                <div className="article-heading">
                  <h1 className="single-article-title">
                    <input
                      name="title"
                      value={this.state.title}
                      onChange={this.onInputChange}
                      className="form-control input-title"
                      placeholder="Enter article title..."
                    />
                  </h1>
                  <div className="row">
                    <div id="article-body" className="col">
                      <hr />
                      <div id="article-photo" className="single-article-body">
                        <Editor
                          initialValue=""
                          init={{
                            inline: false,
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
          </div>
        </div>
      </div>
    );
  }
}

export default NewArticle;
