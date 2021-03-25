/* --------------------------------------------------------------------------------------------------------------------------------------------
  Artwork results page logic, after selecting filters, this logic adjusts what one sees
*/
import React from "react";
import Filters from "./filters.jsx";
import Loader from "./helpers/loader.jsx";
import { Link } from "react-router";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnNextClick = this.btnNextClick.bind(this);
    this.btnPrevClick = this.btnPrevClick.bind(this);
    this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
    this.state = {
      articles: [],
      filterOption: [],
      culture_group: "",
      artwork_type: "",
      institution: "",
      material: "",
      url: "/api/articles",
      loading: true,
      currentArticle: 1,
      articlesPerPage: 5,
      upperPageBound: 3,
      lowerPageBound: 0,
      isPrevBtnActive: "disabled",
      isNextBtnActive: "arrow-active",
      pageBound: 3
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

  componentDidUpdate() {
    $("ul li.page-active").removeClass("page-active");
    $("ul li#" + this.state.currentArticle).addClass("page-active");
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // If clicked on an article, change to that corresponding articles display

  handleClick(val, type, event) {
    let filterOption = [];
    console.log(type);

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
      case "allCultureGroup":
        this.setState({ culture_group: val });
        break;
      case "allArtworkType":
        this.setState({ artwork_type: val });
        break;
      case "allMaterial":
        this.setState({ material: val });
        break;
      case "allInstitution":
        this.setState({ institution: val });
        break;
      default:
        break;
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // handlePageClick() - Used for clicking through pagination numbers without building new components.
  handlePageClick(event) {
    let listid = Number(event.target.id);
    this.setState({
      currentArticle: listid
    });
    $("ul li.active").removeClass("page-active");
    $("ul li#" + listid).addClass("page-active");
    this.setPrevAndNextBtnClass(listid);
  }

  setPrevAndNextBtnClass(listid) {
    let totalPage = Math.ceil(
      this.state.articles.length / this.state.articlesPerPage
    );
    this.setState({ isNextBtnActive: "disabled" });
    this.setState({ isPrevBtnActive: "disabled" });
    if (totalPage === listid && totalPage > 1) {
      this.setState({ isPrevBtnActive: "arrow-active" });
    } else if (listid === 1 && totalPage > 1) {
      this.setState({ isNextBtnActive: "arrow-active" });
    } else if (totalPage > 1) {
      this.setState({ isNextBtnActive: "arrow-active" });
      this.setState({ isPrevBtnActive: "arrow-active" });
    }
  }

  btnIncrementClick() {
    this.setState({
      upperPageBound: this.state.upperPageBound + this.state.pageBound
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound + this.state.pageBound
    });
    let listid = this.state.upperPageBound + 1;
    this.setState({ currentArticle: listid });
    this.setPrevAndNextBtnClass(listid);
  }
  btnDecrementClick() {
    this.setState({
      upperPageBound: this.state.upperPageBound - this.state.pageBound
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound - this.state.pageBound
    });
    let listid = this.state.upperPageBound - this.state.pageBound;
    this.setState({ currentArticle: listid });
    this.setPrevAndNextBtnClass(listid);
  }
  btnPrevClick() {
    if ((this.state.currentArticle - 1) % this.state.pageBound === 0) {
      this.setState({
        upperPageBound: this.state.upperPageBound - this.state.pageBound
      });
      this.setState({
        lowerPageBound: this.state.lowerPageBound - this.state.pageBound
      });
    }
    let listid = this.state.currentArticle - 1;
    this.setState({ currentArticle: listid });
    this.setPrevAndNextBtnClass(listid);
  }
  btnNextClick() {
    if (this.state.currentArticle + 1 > this.state.upperPageBound) {
      this.setState({
        upperPageBound: this.state.upperPageBound + this.state.pageBound
      });
      this.setState({
        lowerPageBound: this.state.lowerPageBound + this.state.pageBound
      });
    }
    let listid = this.state.currentArticle + 1;
    this.setState({ currentArticle: listid });
    this.setPrevAndNextBtnClass(listid);
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
      "institution",
      "allCultureGroup",
      "allArtworkType"
    ];
    filterProperties.forEach(function(filterBy) {
      var filterValue = state[filterBy];
      if (filterValue) {
        filteredItems = filteredItems.filter(function(item) {
          return item[filterBy] === filterValue;
        });
      }
    });
    const {
      currentArticle,
      articlesPerPage,
      upperPageBound,
      lowerPageBound,
      isPrevBtnActive,
      isNextBtnActive
    } = state;
    const articles = filteredItems;
    const indexOfLastArticle = currentArticle * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(
      indexOfFirstArticle,
      indexOfLastArticle
    );
    const regex = /(<([^>]+)>)/gi;
    const renderAll = currentArticles.map(item => (
      <div key={item.id} className="col-md-10 col-sm-12">
        <div id="result" className="card">
          <div className="row no-gutters">
            <div className="col-md-4">
              <Link
                to={"/article/" + item.id}
                className="card-img my-card-img-top"
                dangerouslySetInnerHTML={{ __html: item.photo }}
              ></Link>
            </div>
            <div className="col-md-8">
              <Link to={"/article/" + item.id}>
                <button className="btn btn-round btn-default btn-outline-default m-3 float-right">
                  Learn more
                </button>
              </Link>
              <div className="card-body">
                <p className="card-title article-title results">
                  <Link to={"/article/" + item.id} className="results">
                    {item.title}
                  </Link>
                </p>
                <div className="card-text">
                  <span className="badge badge-pill badge-custom  mr-1">
                    {item.culture_group.replace(regex, "")}
                  </span>
                  <span className="badge badge-pill badge-custom  mr-1">
                    {item.artwork_type.replace(regex, "")}
                  </span>
                  <span className="badge badge-pill badge-custom  mr-1">
                    {item.material.replace(regex, "")}
                  </span>
                  <span className="badge badge-pill badge-custom mr-1">
                    {item.institution.replace(regex, "")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      if (number === 1 && currentArticle === 1) {
        return (
          <li
            key={number}
            className="page-active page-item page-custom"
            id={number}
            onClick={this.handlePageClick}
          >
            {number}
          </li>
        );
      } else if (number < upperPageBound + 1 && number > lowerPageBound) {
        return (
          <li
            key={number}
            id={number}
            className="page-item page-custom"
            onClick={this.handlePageClick}
          >
            {number}
          </li>
        );
      }
    });

    let pageIncrementBtn = null;
    if (pageNumbers.length > upperPageBound) {
      pageIncrementBtn = (
        <li className="page-item page-custom" onClick={this.btnIncrementClick}>
          &hellip;
        </li>
      );
    }
    let pageDecrementBtn = null;
    if (lowerPageBound >= 1) {
      pageDecrementBtn = (
        <li className="page-item page-custom" onClick={this.btnDecrementClick}>
          &hellip;
        </li>
      );
    }
    let renderPrevBtn = null;
    if (isPrevBtnActive === "disabled") {
      renderPrevBtn = (
        <li className={isPrevBtnActive}>
          <span id="btnPrev"> &#10094; </span>
        </li>
      );
    } else {
      renderPrevBtn = (
        <li className={isPrevBtnActive} onClick={this.btnPrevClick}>
          &#10094;
        </li>
      );
    }
    let renderNextBtn = null;
    if (isNextBtnActive === "disabled") {
      renderNextBtn = (
        <li className={isNextBtnActive}>
          <span id="btnNext"> &#10095; </span>
        </li>
      );
    } else {
      renderNextBtn = (
        <li className={isNextBtnActive} onClick={this.btnNextClick}>
          &#10095;
        </li>
      );
    }

    if (this.state.loading) return <Loader />;
    else;
    return (
      <div className="content-container">
        <div className="row">
          <div className="left-side col-lg-3">
            <div className="col-lg-auto col-md-12 col-sm-12 float-right">
              <h5>Filter by</h5>
              <Filters handleClick={this.handleClick} />
            </div>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12">
            <nav
              aria-label="Page navigation example"
              className="col-md-10 col-sm-12"
            >
              <ul id="pagination" className="justify-content-end pagination">
                {renderPrevBtn}
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
                {renderNextBtn}
              </ul>
            </nav>
            {renderAll}
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
