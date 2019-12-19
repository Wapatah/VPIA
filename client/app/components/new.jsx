import React from "react";
import { hashHistory } from "react-router";
import Loader from "./loader.jsx";
//import Alert from "react-s-alert";

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/image.min';
import 'froala-editor/js/plugins/file.min';

import FroalaEditor from 'react-froala-wysiwyg';

import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

import EditorPreview from "./helpers/editor_preview.jsx";

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
        <div className="content-container">
          <div className="row">
            <div id="left-side" className="col-md-1"></div>
            <div className="col-md-5">
              <div className="col-md-12">
                <input
                  ref="title"
                  className="form-control input-title"
                  placeholder="Enter article title..."
                />
              </div>
              <br />
              Institution Photo
              <div className="border rounded">
              <FroalaEditor
                  tag='textarea'
                  config={this.config}
                  model={this.state.content}
                  onModelChange={(e) => {
                    let photo = this.state.photo;
                    this.setState({ photo: e});
                  }}
                  config={{
                    placeholderText: " ",
                    charCounterCount: false,
                    attribution: false,
                    imageUpload: true,
                    toolbarInline: true,
                    toolbarVisibleWithoutSelection: true,
                    imageUploadURL: "http://localhost:30500/upload",
                    imageUploadMethod: 'POST',
                  }}
                />
              </div>
              Photo License
              <div className="border rounded">
                <FroalaEditor
                  tag='textarea'
                  config={this.config}
                  model={this.state.content}
                  onModelChange={(e) => {
                    let photo_license = this.state.photo_license;
                    this.setState({ photo_license: e});
                  }}
                  config={{
                    placeholderText: " ",
                    charCounterCount: false,
                    attribution: false,
                    imageUpload: false,
                    toolbarInline: true,
                    toolbarVisibleWithoutSelection: true
                  }}
                />
              </div>
              Holding Institution
              <div className="border rounded">
               <FroalaEditor
                  tag='textarea'
                  config={this.config}
                  model={this.state.content}
                  onModelChange={(e) => {
                    let institution = this.state.institution;
                    this.setState({ institution: e});
                  }}
                  config={{
                    placeholderText: " ",
                    charCounterCount: false,
                    attribution: false,
                    imageUpload: false,
                    toolbarInline: true,
                    toolbarVisibleWithoutSelection: true
                  }}
                />
              </div>
              Culture Group
              <div className="border rounded">
                <FroalaEditor
                  tag='textarea'
                  config={this.config}
                  model={this.state.content}
                  onModelChange={(e) => {
                    let culture_group = this.state.culture_group;
                    this.setState({ culture_group: e});
                  }}
                  config={{
                    placeholderText: " ",
                    charCounterCount: false,
                    attribution: false,
                    imageUpload: false,
                    toolbarInline: true,
                    toolbarVisibleWithoutSelection: true
                  }}
                />
              </div>
              Material
              <div className="border rounded">
               <FroalaEditor
                  tag='textarea'
                  config={this.config}
                  model={this.state.content}
                  onModelChange={(e) => {
                    let material = this.state.material;
                    this.setState({ material: e});
                  }}
                  config={{
                    placeholderText: " ",
                    charCounterCount: false,
                    attribution: false,
                    imageUpload: false,
                    toolbarInline: true,
                    toolbarVisibleWithoutSelection: true
                  }}
                />
              </div>
              Artwork Type
              <div className="border rounded">
               <FroalaEditor
                  tag='textarea'
                  config={this.config}
                  model={this.state.content}
                  onModelChange={(e) => {
                    let artwork_type = this.state.artwork_type;
                    this.setState({ artwork_type: e});
                  }}
                  config={{
                    placeholderText: " ",
                    charCounterCount: false,
                    attribution: false,
                    imageUpload: false,
                    toolbarInline: true,
                    toolbarVisibleWithoutSelection: true
                  }}
                />
              </div>
              <div className="row">
                <div className="col-md-12 new-article-form">
                  <FroalaEditor
                    tag='textarea'
                    config={this.config}
                    model={this.state.content}
                    onModelChange={(e) => {
                      let body = this.state.body;
                      this.setState({ body: e});
                    }}
                    config={{
                      charCounterCount: false,
                      attribution: false,
                      imageUpload: true,
                    }}
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
          </div>
        </div>
      );
  }
}

export default NewArticle;
