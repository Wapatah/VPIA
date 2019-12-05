import React from "react";
import Loader from "./loader.jsx";
import { Link, hashHistory } from "react-router";

class ArtworkResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      url: "/api/articles",
      loading: true,
      currentArticle: 1,
      articlesPerPage: 9
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({
      currentArticle: Number(event.target.id)
    });
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
        } else {
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
        } else {
          that.setState({ articles: response.data });
        }
        that.setState({ loading: false });
      });
  }
  render() {
    const { articles, currentArticle, articlesPerPage } = this.state;
    // Logic for displaying todos
    const indexOfLastArticle = currentArticle * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(
      indexOfFirstArticle,
      indexOfLastArticle
    );

    const renderArticles = currentArticles.map(article => {
      return (
        <div key={article.id} className="col-md-4">
          <div id="result" className="card card-block">
            <div
              id="my-card-img-top"
              dangerouslySetInnerHTML={{ __html: article.photo }}
            ></div>
            <div className="card-body">
              <p className="article-title">
                <Link to={"/article/" + article.id} className="text-dark">
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
      );
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li
              className="page-item"
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          </ul>
        </nav>
      );
    });

    if (this.state.loading) return <Loader />;
    if (this.state.articles.length < 1) {
      return (
        <p className="help-block center-align">
          There are no articles under this topic
        </p>
      );
    } else {
      return (
        <div>
          <div id="page-numbers">{renderPageNumbers}</div>
          <div className="card-deck">{renderArticles}</div>
        </div>
      );
    }
  }
}

export default ArtworkResults;
