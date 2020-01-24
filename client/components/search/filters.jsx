/* --------------------------------------------------------------------------------------------------------------------------------------------
  Logic to handle automatic artwork filtering inside the search results page
*/
import React from "react";
import Loader from "../helpers/loader.jsx";
import StatusAlert, { StatusAlertService } from "react-status-alert";

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.articleSelect = this.articleSelect.bind(this);
    this.state = { articles: [], material: "", loading: true };
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Onload, fetch all articles
  componentDidMount() {
    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    var myInit = { method: "GET", headers: myHeaders };
    var that = this;

    fetch("/api/articles/", myInit)
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
  // Filter article based on selecting material
  articleSelect(material, e) {
    e.preventDefault();
    this.props.articleChange(this.state.material);
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Displays the filter component with the search filters as dropdown
  render() {
    if (this.state.loading) return <Loader />;
    return (
      <div>
        <StatusAlert />
        <div className="dropdown">
          <button
            className="btn btn-outline btn-block dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Culture Group
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {this.state.articles.map(article => (
              <a
                key={article.culture_group}
                href="#"
                className="dropdown-item"
                onClick={e => this.articleSelect(article.culture_group, e)}
              >
                <h4
                  className="list-group-item-heading"
                  dangerouslySetInnerHTML={{
                    __html: article.culture_group
                  }}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-outline btn-block dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Artwork Type
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {this.state.articles.map(article => (
              <a
                key={article.artwork_type}
                href="#"
                className="dropdown-item"
                onClick={e => this.articleSelect(article.artwork_type, e)}
              >
                <h4
                  className="list-group-item-heading"
                  dangerouslySetInnerHTML={{
                    __html: article.artwork_type
                  }}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-outline btn-block dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Material
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {this.state.articles.map(article => (
              <a
                key={article.material}
                href="#"
                className="dropdown-item"
                onClick={e => this.articleSelect(article.material, e)}
              >
                <h4
                  className="list-group-item-heading"
                  dangerouslySetInnerHTML={{
                    __html: article.material
                  }}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-outline btn-block dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Holding Institution
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {this.state.articles.map(article => (
              <a
                key={article.institution}
                href="#"
                className="dropdown-item"
                onClick={e => this.articleSelect(article.institution, e)}
              >
                <h4
                  className="list-group-item-heading"
                  dangerouslySetInnerHTML={{
                    __html: article.institution
                  }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Filters;
