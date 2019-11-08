import React from "react";
import Loader from "./loader.jsx";
import { Link, hashHistory } from "react-router";
import Alert from "react-s-alert";

class BrowseArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], url: "/api/articles", loading: true };
  }

  componentDidMount() {
    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    var myInit = { method: "GET", headers: myHeaders };
    var that = this;
    var url = "/api/articles";
    fetch(url, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) Alert.error(response.error.message);
        else {
          that.setState({ articles: response.data });
        }
        that.setState({ loading: false });
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: true });
    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    var myInit = { method: "GET", headers: myHeaders };
    var that = this;
    var url = "/api/articles";
    if (nextProps.topicId == null && this.props.topicId == null)
      var url = "/api/articles";
    else var url = "/api/topic/" + nextProps.topicId + "/articles";
    fetch(url, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) Alert.error(response.error.message);
        else {
          that.setState({ articles: response.data });
        }
        that.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.articles.length < 1) {
      return (
        <p className="help-block center-align">
          There are no articles under this topic
        </p>
      );
    } else {
      return (
        <div className="card-deck">
          {this.state.articles.slice(0, 4).map(article => (
            <div key={article.id} className="card card-block">
              <img src="..." className="card-img-top" alt="..."></img>
              <div className="card-body">
                <p className="article-title">
                  <Link to={"/article/" + article.id} className="text-dark">
                    {article.title}
                  </Link>
                </p>
                <p className="card-text"></p>
                <p className="card-text">
                  <small class="text-muted">
                    <i className="fa fa-clock-o"></i>{" "}
                    {new Date(
                      article.updated_at.replace(" ", "T")
                    ).toLocaleString()}
                  </small>
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default BrowseArticles;
