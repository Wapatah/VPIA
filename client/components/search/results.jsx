/* --------------------------------------------------------------------------------------------------------------------------------------------
  Artwork results page logic, after selecting filters, this logic adjusts what one sees
*/
import React from "react";
import ArtworkResults from "./artwork_results.jsx";
import Filters from "./filters.jsx";
import BrowseTopics from "../wiki/browse_topics.jsx";
import Loader from "../helpers/loader.jsx";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = { topicId: "1", loading: true };
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Onload set loading to false
  componentDidMount() {
    this.setState({ loading: false });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // If clicked on topic, change the topic to that clicked one
  handleUpdate(id) {
    this.setState({ topicId: id });
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
                <BrowseTopics topicChange={this.handleUpdate} />
                <Filters topicChange={this.handleUpdate} />
              </div>
            </div>
            <div className="col-lg-8">
              <ArtworkResults topicId={this.state.topicId} />
            </div>
          </div>
        </div>
      );
  }
}

export default Results;
