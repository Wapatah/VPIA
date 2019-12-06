import React from "react";
import ArtworkResults from "./artwork_results.jsx";
import { hashHistory } from "react-router";
import Loader from "./loader.jsx";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = { topicId: "1", loading: true };
  }

  handleUpdate(id) {
    this.setState({ topicId: id });
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) return <Loader />;
    else
      return (
        <div className="content-container">
          <div className="row">
            <div id="left-side" className="col-md-1">
              <p className="text-right edit-page-title">Search Results</p>
            </div>
            <div className="col-md-8">
              <ArtworkResults topicId={this.state.topicId} />
            </div>
          </div>
        </div>
      );
  }
}

export default Results;
