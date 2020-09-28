/* --------------------------------------------------------------------------------------------------------------------------------------------
  Artwork results page logic, after selecting filters, this logic adjusts what one sees
*/
import React from "react";
import ArtworkResults from "./artwork_results.jsx";
import ArtworkCardDeck from "./artwork_carddeck.jsx";
import Filters from "./filters.jsx";
import Loader from "./helpers/loader.jsx";

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
        <div className="container artwork">
          <h1 className="artwork-intro text-center">
            Artworks (What, Why & How)
          </h1>
          <div className="row justify-content-center">
            <div className="col-sm-8">
              <p className="artwork-intro mt-1">
                The pilot of the VPIA specifically documents collections of
                historical and contemporary Indigenous artworks that depict
                non-Indigenous people, technologies and traditions.
              </p>
              <p className="artwork-intro mb-3">
                These artworks offer valuable perspectives and insight into
                processes of colonization, cultural contact, and Indigenous
                philosophy, aesthetic, and research methodology.
              </p>
            </div>
          </div>
          <h1 className="mt-3">Drawings</h1>
          <ArtworkCardDeck />
          <h1 className="mt-3">Figures</h1>
          <h1 className="mt-3">Masks</h1>
          <h1 className="mt-3">Pipes</h1>
        </div>
      );
  }
}

export default Results;
