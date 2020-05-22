/* --------------------------------------------------------------------------------------------------------------------------------------------
  Artwork results page logic, after selecting filters, this logic adjusts what one sees
*/
import React from "react";
import ArtworkResults from "./artwork_results.jsx";
import Filters from "./filters.jsx";
import Loader from "../../../client/components/helpers/loader.jsx";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = { articleId: "1", loading: true };
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Onload set loading to false
  componentDidMount() {
    this.setState({ loading: false });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // If clicked on an article, change to that corresponding articles display
  handleUpdate(id) {
    this.setState({ articleId: id });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Render the Search results along with the filters
  render() {
    if (this.state.loading) return <Loader />;
    else
      return (
        <div className="content-container">
          <div className="row">
            <div id="left-side" className="col-md-1">
              <p className="text-right edit-page-title">Search Results</p>
              <p className="text-right">Filter by</p>
              <div className="col-lg-6 float-right">
                <Filters articleChange={this.handleUpdate} />
              </div>
            </div>
            <div className="col-lg-8">
              <ArtworkResults articleId={this.state.articleId} />
            </div>
          </div>
        </div>
      );
  }
}

export default Results;
