/* --------------------------------------------------------------------------------------------------------------------------------------------
  This is the Artwork Results page. List of all the articles can be found on this page. 
  This page is used to filter and allow for more discoverability of the artwork.
*/
import React from "react";
import Loader from "./helpers/loader.jsx";
import { Link } from "react-router";

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

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  On component load, GET ALL Articles
*/
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

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // handleClick() - Used for clicking through pagination numbers without building new components.
  handleClick(event) {
    this.setState({
      currentArticle: Number(event.target.id)
    });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // render() - Lists all Articles and paginates them to reduce visual clutter.
  render() {
    const { articles, currentArticle, articlesPerPage } = this.state;
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
            <Link
              to={"/article/" + article.id}
              id="my-card-img-top"
              dangerouslySetInnerHTML={{ __html: article.photo }}
            ></Link>
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
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });

    if (this.state.loading) return <Loader />;
    if (this.state.articles.length < 1) {
      return <p className="help-block center-align">No Articles were found.</p>;
    } else {
      return (
        <div>
          <ul id="page-numbers" className="justify-content-end">
            {renderPageNumbers}
          </ul>
          <div className="card-deck">{renderArticles}</div>
        </div>
      );
    }
  }
}

export default ArtworkResults;
