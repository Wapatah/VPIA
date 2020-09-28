/* --------------------------------------------------------------------------------------------------------------------------------------------
  Browse Articles is used as a convenient display of articles - this is currently used as Recent artworks on the main page
  to engage platform users.
*/
import React from "react";
import Loader from "./helpers/loader.jsx";
import { Link, hashHistory } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";

class ArtworkCardDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], url: "/api/articles", loading: true };
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------
  On component load, GET ALL Articles
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
        <div className="row row-cols-3">
          {this.state.articles.slice(0, 3).map(article => (
            <div key={article.id} className="col-md-4">
              <div id="result" className="card card-block">
                <Link
                  to={"/article/" + article.id}
                  className="my-card-img-top"
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
          ))}
        </div>
      );
    }
  }
}

export default ArtworkCardDeck;
