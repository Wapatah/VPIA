/* --------------------------------------------------------------------------------------------------------------------------------------------
  "Home" is just a name for this file that renders the carousels of recent artworks and placeholder events.
*/
import React from "react";
import BrowseArticles from "../../../../WikiService/client/components/browse_articles.jsx";
import Loader from "../helpers/loader.jsx";

class Home extends React.Component {
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

  //--------------------------------------------------------------------------------------------------------------------------------------------
  // This is used to click through articles in places like recent artworks and load the proper page.
  handleUpdate(id) {
    this.setState({ articleId: id });
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Renders the hard coded events - will change with update to ux design.
  render() {
    if (this.state.loading) return <Loader />;
    else
      return (
        <div className="container-fluid">
          <div className="row justify-content-md-center">
            <div className="container p-t-3" aria-label="In conversation">
              <h1 className="title-primary underline-brush">In Conversation</h1>
              <BrowseArticles articleId={this.state.articleId} />
              <h1 className="title-primary underline-brush">
                Current Projects & Events
              </h1>
              <div className="row">
                <div className="col-md-7">
                  <div className="events-card card text-white">
                    <img
                      src="../assets/images/Event_VPIA.jpeg"
                      className="card-img greyscale"
                      alt="Image of the launch of VPIA event"
                      aria-label="Image of the launch of VPIA event"
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
                  <div className="events-card card text-white">
                    <img
                      src="../assets/images/Event_inuitartonline.jpeg"
                      className="card-img greyscale"
                      alt="Image of the Inuit Art On-line event"
                      aria-label="Image of the Inuit Art On-line event"
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
                  <div className="events-card card">
                    <img
                      src="../assets/images/Event_McCord.jpg"
                      class="card-img-top greyscale"
                      alt="Image of the McCord Museum workshop's event with Eric Tootoosis"
                      aria-label="Image of the McCord Museum workshop's event with Eric Tootoosis"
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
                          src="../assets/images/CRKN.png"
                          class="card-img-top greyscale"
                          alt="Image of the Canadian Research Knowledge Network Conference's event"
                          aria-label="Image of the Canadian Research Knowledge Network Conference's event"
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
                          src="../assets/images/Representing.jpg"
                          class="card-img-top greyscale"
                          alt="Image of the Re/presenting the European at the University of Auckland's event"
                          aria-label="Image of the Re/presenting the European at the University of Auckland's event"
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
