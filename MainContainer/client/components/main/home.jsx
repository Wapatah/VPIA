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
    this.state = { articleId: "", loading: true };
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
              <h1 className="title-primary underline-brush">Spotlight</h1>
              <div className="row">
                <div className="col-md-7">
                  <div className="events-card card text-white">
                    <img
                      src="../assets/images/HaidaGwaii.jpg"
                      className="card-img greyscale"
                      alt="Haida Gwaii Knowledge Exchange Workshop"
                      aria-label="Haida Gwaii Knowledge Exchange Workshop"
                    />
                    <div className="card-img-overlay">
                      <img
                        src="../assets/images/event_icon.png"
                        className="top-icon"
                        alt="event icon"
                      />
                      <div className="image-tint-dark"></div>
                      <h5 className="card-title card-content ">
                        Haida Gwaii Knowledge Exchange Workshop
                      </h5>
                      <p className="card-text card-content card-description">
                        February 2019
                      </p>
                    </div>
                  </div>
                  <div className="events-card card text-white">
                    <img
                      src="../assets/images/RoundTable.jpg"
                      className="card-img greyscale"
                      alt="Image of the Inuit Art On-line event"
                      aria-label="Image of the Inuit Art On-line event"
                    />
                    <div className="card-img-overlay">
                      <img
                        src="../assets/images/event_icon.png"
                        className="top-icon"
                        alt="event icon"
                      />
                      <div className="image-tint-dark"></div>
                      <h5 className="card-title card-content ">
                        Indigenizing the Museum Virtual Roundtable Series
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="events-card card">
                    <img
                      src="../assets/images/Event_inuitartonline.jpeg"
                      className="card-img-top greyscale"
                      alt="Image of the McCord Museum workshop's event with Eric Tootoosis"
                      aria-label="Image of the McCord Museum workshop's event with Eric Tootoosis"
                    />
                    <div className="card-body">
                      <p className="article-title">
                        Inuit Art Online Symposium
                      </p>
                      <p className="card-description">November 29 2019</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card">
                        <img
                          src="../assets/images/Eric.jpg"
                          className="card-img-top greyscale"
                          alt="Image of the Canadian Research Knowledge Network Conference's event"
                          aria-label="Image of the Canadian Research Knowledge Network Conference's event"
                        />
                        <div className="card-body">
                          <p className="article-title">
                            McCord Museum Workshop with Eric Tootoosis
                          </p>
                          <p className="card-description">November 2019</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card">
                        <img
                          src="../assets/images/FrontConf.jpeg"
                          className="card-img-top greyscale"
                          alt="Image of the FrontConf conference"
                          aria-label="Image of the FrontConf conference"
                        />
                        <div className="card-body">
                          <p className="article-title">
                            FrontConf Munich FrontEnd Conference
                          </p>
                          <p className="card-description">March 21 2020 </p>
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
