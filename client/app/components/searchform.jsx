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

        <div className="input-group searchcustom">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search Artwork"
            ref="search"
          />
          <span className="input-group-btn">
          <button type="submit" className="btn search-button">
            <i className="fa fa-search"></i>
          </button>
          </span>
        </div>
      </form>

    );
  }
}

export default SearchForm;
