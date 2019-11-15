import React from "react";
import { hashHistory } from "react-router";
//import Alert from "react-s-alert";
import Loader from "./loader.jsx";

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EditorPreview from "./helpers/editor_preview.jsx";

//@Mordax - you can edit the ckeditor file to add and remove plugins
import CKConfig from "../../../config/ckeditor.js";

class EditArticle extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      body: "",
      title: "",
      topic_id: "",
      topics: [],
      loading: true
    };
  }

  handleChange(data) {
    this.setState({ title: this.refs.title.value });
    this.refs.body.value = data.getData();
    this.setState({ body: this.refs.body.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var body = this.state.body;
    var title = this.refs.title.value;
    var topicId = this.refs.topic.value;
    var what_changed = this.refs.what_changed.value;
    if (body && title && topicId && what_changed) {
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
          "&topic_id=" +
          topicId +
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
          if (response.error.error){} //Alert.error(response.error.message);
          else {
            //Alert.success("Article has been successfully saved");
            hashHistory.push("article/" + that.props.params.articleId);
          }
        });
    } else {
      //Alert.error("Article Body, Title, Topic and Change Info is required.");
    }
  }

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
        if (response.error.error){} //Alert.error(response.error.message);
        else {
          that.setState({
            body: response.data[0].body,
            title: response.data[0].title,
            topic_id: response.data[0].topic_id
          });
        }
        that.setState({ loading: false });
      });
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
        if (response.error.error){} //Alert.error(response.error.message);
        else {
          that.setState({ topics: response.data });
        }
      });
  }

  render() {
    if (this.state.loading) return <Loader />;
    else
      return (
        <div className="new-article">
          <div className="row">
            <div className="col-md-12">
              <input
                onChange={this.handleChange}
                ref="title"
                className="form-control input-title"
                value={this.state.title}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-12 new-article-form">
              <CKEditor
                editor={ClassicEditor}
                onInit={()=> {
                  console.log("Editor is ready.");
              } }
                data={this.state.body}
                onChange={ (event, editor) => {
                  let body = this.state.body;
                  this.setState({ body: editor.getData()});
                }}
                config={CKConfig}
              />
              <br />
              <EditorPreview data={this.state.body} />
              <br />
              <label>Choose topic</label>
              <select
                className="form-control topic-select"
                ref="topic"
                defaultValue={this.state.topic_id}
              >
                {this.state.topics.map(topic => (
                  <option value={topic.id} key={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
              <br />
              <div className="whatwrapper">
                <label>What improvements did you make in this edit?</label>
                <textarea
                  ref="what_changed"
                  className="form-control what_changed what"
                  id="what"
                  placeholder="Example: Fixed a typo. It's grammer not grammar"
                />
                <p className="help-block">Keep it short and descriptive :)</p>
              </div>
              <br />
            </div>

            <div className="row">
              <div className="col-md-12">
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
      );
  }
}

export default EditArticle;
