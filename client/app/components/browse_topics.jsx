import React from "react";
import Loader from "./loader.jsx";
import { hashHistory } from "react-router";

class BrowseTopics extends React.Component {
  constructor(props) {
    super(props);
    this.topicSelect = this.topicSelect.bind(this);
    this.state = { topics: [], loading: true };
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

  topicSelect(id, e) {
    e.preventDefault();
    this.props.topicChange(id);
  }

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.topics.length < 1) {
      return (
        <p className="help-block center-align">
          There are no topics created yet
        </p>
      );
    } else {
      return (
        <div className="dropdown">
          <button
            className="btn btn-outline btn-block dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Topics
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {this.state.topics.map(topic => (
              <a
                key={topic.id}
                href="#"
                className="dropdown-item"
                onClick={e => this.topicSelect(topic.id, e)}
              >
                <p className="list-group-item-text">{topic.name}</p>
              </a>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default BrowseTopics;
