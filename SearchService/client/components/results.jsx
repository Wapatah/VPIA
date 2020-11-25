/* --------------------------------------------------------------------------------------------------------------------------------------------
  Artwork results page logic, after selecting filters, this logic adjusts what one sees
*/
import React from "react";
import ArtworkResults from "./artwork_results.jsx";
import Filters from "./filters.jsx";
import Loader from "./helpers/loader.jsx";
import { Link } from "react-router";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      articles: [],
      filterCulture: [],
      url: "/api/articles",
      loading: true
    };
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Onload set loading to false
  componentDidMount() {
    this.setState({
      filterCulture: this.state.articles
    });
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
  // If clicked on an article, change to that corresponding articles display

  handleClick(e, val) {
    const byOrigin = val;
    let filterCulture = [];

    filterCulture = this.state.articles.filter(
      article => article.culture_group === byOrigin
    );

    this.setState({ filterCulture: filterCulture });
    console.log(filterCulture);
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Render the Search results along with the filters
  render() {
    const renderAll = this.state.filterCulture.map(article => (
      <div key={article.id} className="col-md-10">
        <div id="result" className="card card-block">
          <Link
            to={"/article/" + article.id}
            className="my-card-img-top results"
            dangerouslySetInnerHTML={{ __html: article.photo }}
          ></Link>
          <div className="card-body">
            <p className="article-title">
              <Link to={"/article/" + article.id} className="text-dark">
                {article.title}
              </Link>
            </p>
            <div className="card-text">
              <small className="text-muted">
                <p
                  id="Baskerville"
                  dangerouslySetInnerHTML={{
                    __html: article.culture_group
                  }}
                ></p>
                <p id="Baskerville">
                  {new Date(article.updated_at.replace(" ", "T")).toUTCString()}
                </p>
              </small>
            </div>
          </div>
        </div>
      </div>
    ));
    if (this.state.loading) return <Loader />;
    else;
    return (
      <div className="content-container">
        <div className="row">
          <div className="left-side col-lg-3">
            <div className="col-lg-6 float-right">
              <p>Filter by</p>
              <Filters handleClick={this.handleClick} />
            </div>
          </div>
          <div className="col-md-8">{renderAll}</div>
        </div>
      </div>
    );
  }
}

export default Results;
