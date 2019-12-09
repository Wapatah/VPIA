import React from "react";
import Loader from "./loader.jsx";
import { Link, hashHistory } from "react-router";
//import Alert from "react-s-alert";

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
        if (response.error.error) {
        } //Alert.error(response.error.message);
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
        if (response.error.error) {
        } //Alert.error(response.error.message);
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
        <div
          className="carousel slide"
          data-ride="carousel"
          id="carouselExampleControls"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 text-right mb-4">
                <a
                  className="btn prev"
                  href="#carouselExampleControls"
                  title="go back"
                  data-slide="prev"
                >
                  <i className="fa fa-lg fa-chevron-left"></i>
                </a>
                <a
                  className="btn next"
                  href="#carouselExampleControls"
                  title="more"
                  data-slide="next"
                >
                  <i className="fa fa-lg fa-chevron-right"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row">
                {this.state.articles.slice(0, 4).map(article => (
                  <div key={article.id} className="col-md-3">
                    <div className="card">
                      <div
                        id="my-card-img-top greyscale"
                        dangerouslySetInnerHTML={{ __html: article.photo }}
                      ></div>

                      <div className="card-body">
                        <p className="article-title">
                          <Link
                            to={"/article/" + article.id}
                            className="text-dark"
                          >
                            {article.title}
                          </Link>
                        </p>
                        <p className="card-text"></p>
                        <p className="card-text">
                          <small className="text-muted">
                            <i className="fa fa-clock-o"></i>{" "}
                            {new Date(
                              article.updated_at.replace(" ", "T")
                            ).toUTCString()}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                {this.state.articles.slice(4, 8).map(article => (
                  <div key={article.id} className="col-md-3">
                    <div className="card">
                      <div
                        id="my-card-img-top"
                        dangerouslySetInnerHTML={{ __html: article.photo }}
                      ></div>
                      <div className="card-body">
                        <p className="article-title">
                          <Link
                            to={"/article/" + article.id}
                            className="text-dark"
                          >
                            {article.title}
                          </Link>
                        </p>
                        <p className="card-text"></p>
                        <p className="card-text">
                          <small className="text-muted">
                            <i className="fa fa-clock-o"></i>{" "}
                            {new Date(
                              article.updated_at.replace(" ", "T")
                            ).toUTCString()}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default BrowseArticles;
