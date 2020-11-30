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
      filterOption: [],
      culture_group: "",
      artwork_type: "",
      institution: "",
      material: "",

      url: "/api/articles",
      loading: true
    };
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Onload set loading to false
  componentDidMount() {
    this.setState({
      filterOption: this.state.articles
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

  handleClick(val, type, event) {
    let filterOption = [];
    console.log(type);
    console.log(val);
    switch (type) {
      case "culture_group":
        this.setState({ culture_group: val });
        break;
      case "artwork_type":
        this.setState({ artwork_type: val });
        break;
      case "material":
        this.setState({ material: val });
        break;
      case "institution":
        this.setState({ institution: val });
        break;
      default:
        break;
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Render the Search results along with the filters
  render() {
    var filteredItems = this.state.articles;
    var state = this.state;
    var filterProperties = [
      "culture_group",
      "artwork_type",
      "material",
      "institution"
    ];
    filterProperties.forEach(function(filterBy) {
      var filterValue = state[filterBy];
      if (filterValue) {
        filteredItems = filteredItems.filter(function(item) {
          return item[filterBy] === filterValue;
        });
      }
    });

    const renderAll = filteredItems.map(item => (
      <div key={item.id} className="col-md-10">
        <div id="result" className="card card-block">
          <Link
            to={"/article/" + item.id}
            className="my-card-img-top results"
            dangerouslySetInnerHTML={{ __html: item.photo }}
          ></Link>
          <div className="card-body">
            <p className="article-title">
              <Link to={"/article/" + item.id} className="text-dark">
                {item.title}
              </Link>
            </p>
            <div className="card-text">
              <small className="text-muted">
                <p
                  id="Baskerville"
                  dangerouslySetInnerHTML={{
                    __html: item.culture_group
                  }}
                ></p>
                <p id="Baskerville">
                  {new Date(item.updated_at.replace(" ", "T")).toUTCString()}
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
