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
  async handleSubmit(e) {
    e.preventDefault();
    let record = {
      body: encodeURIComponent(this.state.body),
      title: encodeURIComponent(this.state.title),
      culture_group: encodeURIComponent(this.state.culture_group),
      material: encodeURIComponent(this.state.material),
      artwork_type: encodeURIComponent(this.state.artwork_type),
      photo: encodeURIComponent(this.state.photo),
      institution: encodeURIComponent(this.state.institution),
      photo_license: encodeURIComponent(this.state.photo_license),
      tags: encodeURIComponent(this.state.tags)
    };

    let article_id = "";
    let what_changed = "";

    if (record) {
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem("userToken")
      });

      // Build the Article API request
      let article_request = {
        method: "POST",
        headers: headers,
        body:
          "title=" +
          record.title +
          "&body=" +
          record.body +
          "&culture_group=" +
          record.culture_group +
          "&material=" +
          record.material +
          "&artwork_type=" +
          record.artwork_type +
          "&photo=" +
          record.photo +
          "&tags=" +
          record.tags +
          "&institution=" +
          record.institution +
          "&photo_license=" +
          record.photo_license +
          "&user_id=" +
          window.localStorage.getItem("user_id")
      };

      // Create Article first with the request
      const res = await fetch("/api/articles/", article_request);
      const json = await res.json();
      if (json.error.error) {
        StatusAlertService.showError(json.error.message);
      } else {
        article_id = json.data.id;
        what_changed = encodeURIComponent(json.data.what_changed);
      }

      // Then build the Archive API request
      let archive_request = {
        method: "POST",
        headers: headers,
        body:
          "article_id=" +
          article_id +
          "&title=" +
          record.title +
          "&body=" +
          record.body +
          "&culture_group=" +
          record.culture_group +
          "&institution=" +
          record.institution +
          "&material=" +
          record.material +
          "&artwork_type=" +
          record.artwork_type +
          "&photo=" +
          record.photo +
          "&tags=" +
          record.tags +
          "&user_id=" +
          window.localStorage.getItem("user_id") +
          "&what_changed=" +
          what_changed
      };

      // Create Archive after the article request
      if (what_changed !== "" && article_id !== "") {
        const res = await fetch(
          `${process.env.HISTORYSERVICE}/api/archives/`,
          archive_request
        );
        const json = await res.json();
        if (json.error.error) {
          StatusAlertService.showError(json.error.message);
        } else {
          StatusAlertService.showSuccess(
            "Article + Original Institution Created Successfully!"
          );
          hashHistory.push("article/" + article_id + "?new=true");
        }
      } else {
        StatusAlertService.showError(
          "Something went wrong with creating the Article."
        );
      }
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
                  id="mainPhoto"
                  initialValue='<img src="../../assets/images/logo.png">'
                  init={{
                    inline: true,
                    menubar: false,
                    images_upload_url: process.env.IMAGEUPLOAD,
                    a11y_advanced_options: true,
                    images_reuse_filename: true,
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
                  className="bottom-align-text tabBar-tab green-tab is-active"
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
                          id="mainEditor"
                          initialValue=""
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
