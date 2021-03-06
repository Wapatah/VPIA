/* --------------------------------------------------------------------------------------------------------------------------------------------
  Browse Articles is used as a convenient display of articles - this is currently used as Recent artworks on the main page
  to engage platform users.
*/
import React from "react";
import Loader from "./helpers/loader.jsx";
import { Link, hashHistory } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";

class BrowseArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], url: "/api/articles", loading: true };
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------
    On load, GET ALL articles
  */
  componentDidMount() {
    let myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });

    let myInit = { method: "GET", headers: myHeaders };
    let that = this;
    let url = "/api/articles";

    fetch(url, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          StatusAlertService.showError(response.error.message);
        } else {
          that.setState({ articles: response.data });
        }
        that.setState({ loading: false });
      });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Browse articles under a specific clicked on article such as recent artworks carousel
  componentWillReceiveProps(nextProps) {
    this.setState({ loading: true });

    let myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    let myInit = { method: "GET", headers: myHeaders };
    let that = this;
    let url = "/api/articles";

    if (!nextProps.articleId == null && !this.props.articleId == null)
      url = "/api/articles/" + nextProps.articleId;

    fetch(url, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          StatusAlertService.showError(response.error.message);
        } else {
          that.setState({ articles: response.data });
        }
        that.setState({ loading: false });
      });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Used to render the recent Articles based on recent updates as carousel
  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.articles.length < 1) {
      return <p className="help-block center-align">No Articles were found.</p>;
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
                  onClick={e => e.preventDefault()}
                  title="go back"
                  data-slide="prev"
                >
                  <i className="fa fa-lg fa-chevron-left"></i>
                </a>
                <a
                  className="btn next"
                  href="#carouselExampleControls"
                  onClick={e => e.preventDefault()}
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
                      <Link
                        className="my-card-img-top greyscale"
                        to={"/article/" + article.id}
                        dangerouslySetInnerHTML={{ __html: article.photo }}
                      ></Link>

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
                      <Link
                        className="my-card-img-top greyscale"
                        to={"/article/" + article.id}
                        dangerouslySetInnerHTML={{ __html: article.photo }}
                      ></Link>
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
