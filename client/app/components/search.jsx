import React from "react";
import Loader from "./loader.jsx";
import { Link, hashHistory } from "react-router";
//import Alert from "react-s-alert";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], loading: true };
  }

  componentWillMount() {
    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    var myInit = { method: "GET", headers: myHeaders };
    var that = this;
    fetch(
      "/api/search?query=" +
        encodeURIComponent(this.props.location.query.query),
      myInit
    )
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
    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    var myInit = { method: "GET", headers: myHeaders };
    var that = this;
    fetch("/api/search?query=" + nextProps.location.query.query, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          //Alert.error(response.error.message);
        } else {
          that.setState({ articles: response.data });
        }
        that.setState({ loading: false });
      });
  }

  componentWillUnmount() {
    this.setState({ articles: [] });
  }

  render() {
    if (this.state.loading) return <Loader />;
    else
      return (
        <div className="content-container">
          <div className="row">
            <div id="left-side" className="col-md-1">
              <p className="text-right edit-page-title">Search Results</p>
              <p className="help-block text-right">
                We found {this.state.articles.length} articles for your query
              </p>
            </div>

            {this.state.articles.length > 0 ? (
              <div className="col-md-8 card-deck">
                {this.state.articles.map(article => (
                  <div key={article.id} className="col-md-4">
                    <div id="result" className="card card-block">
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
                        <div className="card-text">
                          <small class="text-muted">
                            <p
                              id="Baskerville"
                              dangerouslySetInnerHTML={{
                                __html: article.culture_group
                              }}
                            ></p>
                            <p id="Baskerville">
                              <i className="fa fa-clock-o" />
                              {new Date(
                                article.updated_at.replace(" ", "T")
                              ).toUTCString()}
                            </p>
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <i className="fa fa-frown-o"></i>
                <p>Please try again with another query</p>
              </div>
            )}
          </div>
        </div>
      );
  }
}

export default Search;
