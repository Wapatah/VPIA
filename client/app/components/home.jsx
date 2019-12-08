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
            <div className="container p-t-3">
              <h5 className="title-primary underline-brush">In Conversation</h5>
              <BrowseArticles topicId={this.state.topicId} />
              <h5 className="title-primary underline-brush">
                Current Projects & Events
              </h5>
              <div className="row">
                <div className="col-md-7">
                  <div id="events-card" className="card text-white">
                    <img
                      src="../assets/pics/Event_VPIA.jpeg"
                      className="card-img greyscale"
                      alt="..."
                    />
                    <div className="card-img-overlay">
                      <div className="image-tint"></div>
                      <h5 className="card-title card-content ">
                        Launch of the Virtual Platform for Indigenous Art
                      </h5>
                      <p className="card-text card-content card-description">
                        Onsite Gallery, December 13th 2019, 2:30pm-5:30pm
                      </p>
                    </div>
                  </div>
                  <div id="events-card" className="card text-white">
                    <img
                      src="../assets/pics/Event_inuitartonline.jpeg"
                      className="card-img greyscale"
                      alt="..."
                    />
                    <div className="card-img-overlay">
                      <div className="image-tint"></div>
                      <h5 className="card-title card-content ">
                        Inuit Art On-Line
                      </h5>
                      <p className="card-text card-content card-description">
                        Onsite Gallery, November 28th 2019, 5:30pm-8:30pm
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-5">
                  <div id="events-card" className="card">
                    <img
                      src="../assets/pics/Event_McCord.jpg"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <p className="article-title">
                        McCord Museum Workshop with Eric Tootoosis
                      </p>
                      <p className="card-description">November 4th-7th 2019</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card">
                        <img
                          src="../assets/pics/Event_McCord.jpg"
                          class="card-img-top"
                          alt="..."
                        />
                        <div class="card-body">
                          <p className="article-title">
                            Canadian Research Knowledge Network Conference
                          </p>
                          <p className="card-description">
                            October 16th-18th 2019
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card">
                        <img
                          src="../assets/pics/Event_McCord.jpg"
                          class="card-img-top"
                          alt="..."
                        />
                        <div class="card-body">
                          <p className="article-title">
                            Re/presenting the European at the University of
                            Auckland
                          </p>
                          <p className="card-description">October 9th 2019</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Home;
