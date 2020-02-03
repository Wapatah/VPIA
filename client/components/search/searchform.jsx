/* --------------------------------------------------------------------------------------------------------------------------------------------
  The search bar input display
*/
import React from "react";
import { hashHistory } from "react-router";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.searchWiki = this.searchWiki.bind(this);
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // If searching, redirect users to the results and passes the value as a prop
  searchWiki() {
    var results = "/search?query=" + this.refs.search.value;
    hashHistory.push(results);
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Render the search input with placeholder
  render() {
    return (
      <form onSubmit={this.searchWiki}>
        <div id="search-bar" className="input-group mb-3">
          <input
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
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
