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
    this.state = {
      articles: [],
      material: "",
      loading: true
    };
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
            <a key={filteredCultureGroup} href="#" className="dropdown-item">
              {filteredCultureGroup.map((culturegroup, i) => (
                <h4 className="list-group-item-heading" key={culturegroup}>
                  {culturegroup}
                  <span className="badge badge-primary badge-pill">
                    {cultureGroupCount[i]}
                  </span>
                </h4>
              ))}
            </a>
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
            <a key={filteredArtworkType} href="#" className="dropdown-item">
              {filteredArtworkType.map((artworktype, i) => (
                <h4 className="list-group-item-heading" key={artworktype}>
                  {artworktype}
                  <span className="badge badge-primary badge-pill">
                    {artworkTypeCount[i]}
                  </span>
                </h4>
              ))}
            </a>
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
            <a key={filteredMaterial} href="#" className="dropdown-item">
              {filteredMaterial.map((material, i) => (
                <h4 className="list-group-item-heading" key={material}>
                  {material}
                  <span className="badge badge-primary badge-pill">
                    {materialCount[i]}
                  </span>
                </h4>
              ))}
            </a>
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
            <a key={filteredInstitution} href="#" className="dropdown-item">
              {filteredInstitution.map((institution, i) => (
                <h4 className="list-group-item-heading" key={institution}>
                  {institution}
                  <span className="badge badge-primary badge-pill">
                    {institutionCount[i]}
                  </span>
                </h4>
              ))}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Filters;
