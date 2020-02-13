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
    //group data of each catergrize and caculate how many is each one
    let groupByCultureGroup = this.state.articles.reduce((acc, it) => {
      acc[it.culture_group] = acc[it.culture_group] + 1 || 1;
      return acc;
    }, {});

    let filteredCultureGroup = Object.keys(groupByCultureGroup);
    let cultureGroupCount = Object.values(groupByCultureGroup);

    //const { filteredCultureGroup, cultureGroupCount } = this.state;
    // var newCultureGroup = {
    //   culturename: filteredCultureGroup,
    //   culturenum: cultureGroupCount
    // };

    //console.log(newarray);
    // console.log(filteredCultureGroup);
    // console.log(cultureGroupCount);

    const groupByArtworkType = this.state.articles.reduce((acc, it) => {
      acc[it.artwork_type] = acc[it.artwork_type] + 1 || 1;
      return acc;
    }, {});
    //console.log(groupByArtworkType);

    const groupByMaterial = this.state.articles.reduce((acc, it) => {
      acc[it.material] = acc[it.material] + 1 || 1;
      return acc;
    }, {});
    //console.log(groupByMaterial);

    const groupByInstitution = this.state.articles.reduce((acc, it) => {
      acc[it.institution] = acc[it.institution] + 1 || 1;
      return acc;
    }, {});
    //console.log(groupByInstitution);

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
            <a key={newCultureGroup} href="#" className="dropdown-item">
              {filteredCultureGroup.map(culturegroup => (
                <h4 className="list-group-item-heading" key={culturegroup}>
                  {culturegroup}
                  <span class="badge badge-primary badge-pill">
                    {culturegroup.culturenum}
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

          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
          ></div>
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

          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
          ></div>
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

          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
          ></div>
        </div>
      </div>
    );
  }
}

export default Filters;
