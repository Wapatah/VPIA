import React from "react";
import { hashHistory } from "react-router";
import Loader from "./loader.jsx";
//import Alert from "react-s-alert";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import InlineEditor from "@ckeditor/ckeditor5-editor-inline/src/inlineeditor";
import EditorPreview from "./helpers/editor_preview.jsx";

// @Mordax - CKEditor file was made for easy configuration and DRY reasons
import CKConfig from "../../../config/ckeditor";

class NewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      body: "",
      topics: [],
      culture_group: "",
      material: "",
      artwork_type: "",
      error: "",
      loading: true
    };
  }

  componentDidMount() {
    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    var myInit = { method: "GET", headers: myHeaders };
    var that = this;
    fetch("/api/topics", myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
        } //Alert.error(response.error.message);
        else {
          that.setState({ topics: response.data });
        }
        that.setState({ loading: false });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    var body = this.state.body;
    var title = this.refs.title.value;
    var topicId = this.refs.topic.value;
    var culture_group = this.state.culture_group;
    var material = this.state.material;
    var artwork_type = this.state.artwork_type;
    var photo = this.state.photo;
    var institution = this.state.institution;
    var photo_license = this.state.photo_license;
    if (
      body &&
      title &&
      topicId &&
      culture_group &&
      material &&
      artwork_type &&
      institution &&
      photo &&
      photo_license
    ) {
      var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem("userToken")
      });
      var myInit = {
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
          "&institution=" +
          encodeURIComponent(institution) +
          "&photo_license=" +
          encodeURIComponent(photo_license) +
          "&topic_id=" +
          topicId +
          "&user_id=" +
          window.localStorage.getItem("user_id")
      };
      var that = this;
      fetch("/api/articles/", myInit)
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
          if (response.error.error) {
          } //Alert.error(response.error.message);
          else {
            //Alert.success("Article has been successfully saved");
            hashHistory.push("article/" + response.data.id + "?new=true");
          }
        });
    } else {
      //Alert.error("Article Body, Title and Topic Information is required.");
    }
  }

  render() {
    if (this.state.loading) return <Loader />;
    else
      return (
        <div className="new-article">
          <div className="row">
            <div className="col-md-12">
              <input
                ref="title"
                className="form-control input-title"
                placeholder="Enter article title..."
              />
            </div>
          </div>
          <br />
          Institution Photo
          <div className="border rounded">
            <CKEditor
              editor={InlineEditor}
              onChange={(event, editor) => {
                let photo = this.state.photo;
                this.setState({ photo: editor.getData() });
              }}
              config={CKConfig}
            />
          </div>
          Photo License
          <div className="border rounded">
            <CKEditor
              editor={InlineEditor}
              onChange={(event, editor) => {
                let photo_license = this.state.photo_license;
                this.setState({ photo_license: editor.getData() });
              }}
              config={CKConfig}
            />
          </div>
          Holding Institution
          <div className="border rounded">
            <CKEditor
              editor={InlineEditor}
              onChange={(event, editor) => {
                let institution = this.state.institution;
                this.setState({ institution: editor.getData() });
              }}
              config={CKConfig}
            />
          </div>
          Culture Group
          <div className="border rounded">
            <CKEditor
              editor={InlineEditor}
              onChange={(event, editor) => {
                let culture_group = this.state.culture_group;
                this.setState({ culture_group: editor.getData() });
              }}
              config={CKConfig}
            />
          </div>
          Material
          <div className="border rounded">
            <CKEditor
              style="outline: 1px solid black"
              editor={InlineEditor}
              onChange={(event, editor) => {
                let material = this.state.material;
                this.setState({ material: editor.getData() });
              }}
              config={CKConfig}
            />
          </div>
          Artwork Type
          <div className="border rounded">
            <CKEditor
              editor={InlineEditor}
              onChange={(event, editor) => {
                let artwork_type = this.state.artwork_type;
                this.setState({ artwork_type: editor.getData() });
              }}
              config={CKConfig}
            />
          </div>
          <div className="row">
            <div className="col-md-12 new-article-form">
              <CKEditor
                editor={ClassicEditor}
                onInit={() => {
                  console.log("Editor is ready.");
                }}
                data="Overview<hr><br><p></p>Body<hr><br><p></p>References<hr><br><p></p>"
                onChange={(event, editor) => {
                  let body = this.state.body;
                  this.setState({ body: editor.getData() });
                }}
                config={CKConfig}
              />
              <br />
              <EditorPreview data={this.state.body} />
              <br />
              <label>Choose topic</label>
              <select className="form-control topic-select" ref="topic">
                {this.state.topics.map(topic => (
                  <option value={topic.id} key={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />
          <br />
          <div className="col-md-12">
            <button
              className="btn btn-default btn-block btn-lg"
              onClick={this.handleSubmit}
            >
              Create Article
            </button>
          </div>
        </div>
      );
  }
}

export default NewArticle;
