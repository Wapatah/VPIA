import React from "react";
import BrowseTopics from "./browse_topics.jsx";
import BrowseArticles from "./browse_articles.jsx";
import { hashHistory } from "react-router";
import Loader from "./loader.jsx";

class Home extends React.Component {
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
        <div className="container-fluid">
          <div className="row justify-content-md-center">
            <div className="col-8">
              <BrowseArticles topicId={this.state.topicId} />
            </div>
          </div>
        </div>
      );
  }
}

export default Home;
