import React from "react";
import { hashHistory } from "react-router";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.searchWiki = this.searchWiki.bind(this);
  }

  searchWiki() {
    var results = "/search?query=" + this.refs.search.value;
    hashHistory.push(results);
  }

  render() {
    return (
      <form onSubmit={this.searchWiki}>
        <div id="search-bar" className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="line"
            placeholder="Search artwork {Example: pipe, Haida Gwaii, Wood, McCord Museum,…}"
            ref="search"
            aria-label="Search Artwork Tab"
          />
          <div className="input-group-append">
            <button
              type="submit"
              className="btn search-button"
              aria-label="Search Button"
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchForm;
