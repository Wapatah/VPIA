/* --------------------------------------------------------------------------------------------------------------------------------------------
  Logic to handle automatic artwork filtering inside the search results page
*/
import React from "react";
import Loader from "./helpers/loader.jsx";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import { hashHistory } from "react-router";

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.articleSelect = this.articleSelect.bind(this);
    this.state = {
      articles: [],
      material: "",
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Onload, fetch all articles
  componentDidMount() {
    let myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    let myInit = { method: "GET", headers: myHeaders };
    let that = this;

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

  handleChange(event) {
    let str = JSON.stringify(event.currentTarget.id);
    let newstr = str.replace(/(<p>|<\/p>)/g, "");
    let results = "/search?query=" + newstr;
    hashHistory.push(results);
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Displays the filter component with the search filters as dropdown
  render() {
    if (this.state.loading) return <Loader />;
    // --------------------------------------------------------------------------------------------------------------------------------------------
    //group data of each catergrize and caculate how many is each one by sepreate into two arrays
    let groupByCultureGroup = this.state.articles.reduce((acc, it) => {
      acc[it.culture_group] = acc[it.culture_group] + 1 || 1;
      return acc;
    }, {});
    let filteredCultureGroup = Object.keys(groupByCultureGroup);
    let cultureGroupCount = Object.values(groupByCultureGroup);

    let groupByArtworkType = this.state.articles.reduce((acc, it) => {
      acc[it.artwork_type] = acc[it.artwork_type] + 1 || 1;
      return acc;
    }, {});
    let filteredArtworkType = Object.keys(groupByArtworkType);
    let artworkTypeCount = Object.values(groupByArtworkType);

    let groupByMaterial = this.state.articles.reduce((acc, it) => {
      acc[it.material] = acc[it.material] + 1 || 1;
      return acc;
    }, {});
    let filteredMaterial = Object.keys(groupByMaterial);
    let materialCount = Object.values(groupByMaterial);

    let groupByInstitution = this.state.articles.reduce((acc, it) => {
      acc[it.institution] = acc[it.institution] + 1 || 1;
      return acc;
    }, {});
    let filteredInstitution = Object.keys(groupByInstitution);
    let institutionCount = Object.values(groupByInstitution);

    return (
      <div>
        <StatusAlert />
        <div className="dropdown">
          <button
            className="btn btn-outline dropdown btn-block dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Culture Group
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {filteredCultureGroup.map((cultureGroup, i) => (
              <button
                id={cultureGroup}
                key={cultureGroup}
                type="button"
                className="dropdown-item"
                onClick={this.handleChange}
              >
                <p
                  key={cultureGroup}
                  id={cultureGroup}
                  className="d-inline filters pr-2"
                  dangerouslySetInnerHTML={{
                    __html: cultureGroup
                  }}
                ></p>
                <span className="d-inline badge badge-primary badge-pill">
                  {cultureGroupCount[i]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-outline dropdown btn-block dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Artwork Type
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {filteredArtworkType.map((artworkType, i) => (
              <button key={artworkType} type="button" className="dropdown-item">
                <p
                  key={artworkType}
                  className="d-inline filters pr-2"
                  dangerouslySetInnerHTML={{
                    __html: artworkType
                  }}
                ></p>
                <span className="d-inline badge badge-primary badge-pill">
                  {artworkTypeCount[i]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-outline dropdown btn-block dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Material
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {filteredMaterial.map((material, i) => (
              <button key={material} type="button" className="dropdown-item">
                <p
                  key={material}
                  className="d-inline filters pr-2"
                  dangerouslySetInnerHTML={{
                    __html: material
                  }}
                ></p>
                <span className="d-inline badge badge-primary badge-pill">
                  {materialCount[i]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-outline dropdown btn-block dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Holding Institution
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {filteredInstitution.map((institution, i) => (
              <button key={institution} type="button" className="dropdown-item">
                <p
                  key={institution}
                  className="d-inline filters pr-2"
                  dangerouslySetInnerHTML={{
                    __html: institution
                  }}
                ></p>
                <span className="d-inline badge badge-primary badge-pill">
                  {institutionCount[i]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Filters;
