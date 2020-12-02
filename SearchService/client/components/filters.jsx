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
    this.addActiveClass = this.addActiveClass.bind(this);
    this.state = {
      articles: [],
      loading: true,
      activeClasses: [false, false, false, false]
    };
  }

  addActiveClass(index) {
    const activeClasses = [
      ...this.state.activeClasses.slice(0, index),
      !this.state.activeClasses[index],
      this.state.activeClasses.slice(index + 1)
    ].flat();
    this.setState({ activeClasses });
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

    const activeClasses = this.state.activeClasses.slice();

    return (
      <div>
        <StatusAlert />
        <div
          className={`${
            activeClasses[0] ? "expanded" : ""
          } dropdown dropdown-filter mb-2`}
          onClick={() => this.addActiveClass(0)}
        >
          <button
            className="btn dropdown btn-block dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="collapse"
            data-target="#culturegroup"
            aria-expanded="false"
            aria-controls="culturegroup"
          >
            Culture Group
          </button>

          <div className="collapse multi-collapse" id="culturegroup">
            <label id="all" key="all" type="button" className="dropdown-item">
              <input
                className="form-check-input"
                type="radio"
                aria-label="Checkbox to select all culture group"
                name="culture group"
                id="allCultureGroup"
                value="allCultureGroup"
                onClick={this.props.handleClick.bind(
                  this,
                  "",
                  "allCultureGroup"
                )}
              />
              <label
                key="allCultureGroup"
                className="d-inline filters pr-2 form-check-label"
                htmlFor="allCultureGroup"
              >
                All
              </label>
            </label>
            {filteredCultureGroup.map((cultureGroup, i) => (
              <label
                id={cultureGroup}
                key={cultureGroup}
                type="button"
                className="dropdown-item"
                onClick={this.props.handleClick.bind(
                  this,
                  cultureGroup,
                  "culture_group"
                )}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  aria-label="Checkbox for artwork type"
                  name="culture group"
                  id={cultureGroup}
                  value={cultureGroup}
                />
                <label
                  key={cultureGroup}
                  className="d-inline filters pr-2 form-check-label"
                  htmlFor={cultureGroup}
                  dangerouslySetInnerHTML={{
                    __html: cultureGroup
                  }}
                ></label>
                <span className="d-inline badge badge-primary badge-pill">
                  {cultureGroupCount[i]}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div
          className={`${
            activeClasses[1] ? "expanded" : ""
          } dropdown dropdown-filter mb-2`}
          onClick={() => this.addActiveClass(1)}
        >
          <button
            className="btn dropdown btn-block dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="collapse"
            data-target="#artworktype"
            aria-expanded="false"
            aria-controls="artworktype"
          >
            Artwork Type
          </button>

          <div className="collapse multi-collapse" id="artworktype">
            <label id="all" key="all" type="button" className="dropdown-item">
              <input
                className="form-check-input"
                type="radio"
                aria-label="Checkbox for artwork type"
                name="artwork type"
                id="allArtworkType"
                value="allArtworkType"
                onClick={this.props.handleClick.bind(
                  this,
                  "",
                  "allArtworkType"
                )}
              />
              <label
                key="allArtworkType"
                id="allArtworkType"
                className="d-inline filters pr-2 form-check-label"
              >
                All
              </label>
            </label>
            {filteredArtworkType.map((artworkType, i) => (
              <label
                key={artworkType}
                type="button"
                className="dropdown-item"
                onClick={this.props.handleClick.bind(
                  this,
                  artworkType,
                  "artwork_type"
                )}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  aria-label="Checkbox for artwork type"
                  name="artwork type"
                  id={artworkType}
                  value={artworkType}
                />
                <label
                  key={artworkType}
                  className="d-inline filters pr-2"
                  dangerouslySetInnerHTML={{
                    __html: artworkType
                  }}
                ></label>
                <span className="d-inline badge badge-primary badge-pill">
                  {artworkTypeCount[i]}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div
          className={`${
            activeClasses[2] ? "expanded" : ""
          } dropdown dropdown-filter mb-2`}
          onClick={() => this.addActiveClass(2)}
        >
          <button
            className="btn dropdown btn-block dropdown-toggle"
            type="button"
            data-toggle="collapse"
            data-target="#material"
            aria-expanded="false"
            aria-controls="material"
          >
            Material
          </button>

          <div className="collapse multi-collapse" id="material">
            <label id="all" key="all" type="button" className="dropdown-item">
              <input
                className="form-check-input"
                type="radio"
                aria-label="Checkbox for artwork type"
                name="material"
                id="material"
                value="material"
                onClick={this.props.handleClick.bind(this, "", "allMaterial")}
              />
              <label
                key="allMaterial"
                id="allMaterial"
                className="d-inline filters pr-2 form-check-label"
              >
                All
              </label>
            </label>
            {filteredMaterial.map((material, i) => (
              <label
                key={material}
                type="button"
                className="dropdown-item"
                onClick={this.props.handleClick.bind(
                  this,
                  material,
                  "material"
                )}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  aria-label="Checkbox for material"
                  name="material"
                />
                <label
                  key={material}
                  className="d-inline filters pr-2 form-check-label"
                  dangerouslySetInnerHTML={{
                    __html: material
                  }}
                ></label>
                <span className="d-inline badge badge-primary badge-pill">
                  {materialCount[i]}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div
          className={`${
            activeClasses[3] ? "expanded" : ""
          } dropdown dropdown-filter mb-2`}
          onClick={() => this.addActiveClass(3)}
        >
          <button
            className="btn dropdown btn-block dropdown-toggle"
            type="button"
            data-toggle="collapse"
            data-target="#institution"
            aria-expanded="false"
            aria-controls="institution"
          >
            Holding Institution
          </button>

          <div className="collapse multi-collapse" id="institution">
            <label id="all" key="all" type="button" className="dropdown-item">
              <input
                className="form-check-input"
                type="radio"
                aria-label="Checkbox for artwork type"
                name="institution"
                id="institution"
                value="institution"
                onClick={this.props.handleClick.bind(
                  this,
                  "",
                  "allInstitution"
                )}
              />
              <label
                key="allInstitution"
                id="allInstitution"
                className="d-inline filters pr-2 form-check-label"
              >
                All
              </label>
            </label>
            {filteredInstitution.map((institution, i) => (
              <label
                key={institution}
                type="button"
                className="dropdown-item"
                onClick={this.props.handleClick.bind(
                  this,
                  institution,
                  "institution"
                )}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  aria-label="Checkbox for institution"
                  name="institution"
                />
                <label
                  key={institution}
                  className="d-inline filters pr-2 form-check-label"
                  dangerouslySetInnerHTML={{
                    __html: institution
                  }}
                ></label>
                <span className="d-inline badge badge-primary badge-pill">
                  {institutionCount[i]}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Filters;
