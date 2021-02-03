/* --------------------------------------------------------------------------------------------------------------------------------------------
  Simple About Page.
*/
import React from "react";

class About extends React.Component {
  render() {
    return (
      <div className="mw-100">
        <div className="container-fluid">
          <div
            className="carousel about slide"
            data-ride="carousel"
            id="carouselExampleControls"
          >
            <div className="container-fluid about-carousel">
              <div className="gradient-right"></div>
              <div className="gradient-left"></div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    <div className="col-xs-2 col-sm-2 col-md-2">
                      <img
                        src="../../assets/images/group.png"
                        className="about-img rounded-img greyscale"
                        alt="Image of Eric"
                      />
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2">
                      <img
                        src="../../assets/images/group.png"
                        className="about-img rounded-img greyscale"
                        alt="Image of Eric"
                      />
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2">
                      <img
                        src="../../assets/images/group.png"
                        className="about-img rounded-img greyscale"
                        alt="Image of Eric"
                      />
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2">
                      <img
                        src="../../assets/images/group.png"
                        className="about-img rounded-img greyscale"
                        alt="Image of Eric"
                      />
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2">
                      <img
                        src="../../assets/images/group.png"
                        className="about-img rounded-img greyscale"
                        alt="Image of Eric"
                      />
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2">
                      <img
                        src="../../assets/images/group.png"
                        className="about-img rounded-img greyscale"
                        alt="Image of Eric"
                      />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-xs-2 col-sm-2 col-md-2">
                      <img
                        src="../../assets/images/group.png"
                        className="about-img rounded-img greyscale"
                        alt="Image of Eric"
                      />
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2">
                      <img
                        src="../../assets/images/group.png"
                        className="about-img rounded-img greyscale"
                        alt="Image of Eric"
                      />
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2">
                      <img
                        src="../../assets/images/group.png"
                        className="about-img rounded-img greyscale"
                        alt="Image of Eric"
                      />
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2">
                      <img
                        src="../../assets/images/group.png"
                        className="about-img rounded-img greyscale"
                        alt="Image of Eric"
                      />
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2">
                      <img
                        src="../../assets/images/group.png"
                        className="about-img rounded-img greyscale"
                        alt="Image of Eric"
                      />
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2">
                      <img
                        src="../../assets/images/group.png"
                        className="about-img rounded-img greyscale"
                        alt="Image of Eric"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="About-intro-section">
            <div className="row">
              <div className="col-lg-4 offset-lg-4">
                <h1 className="About-header">
                  About the Virtual Platform for Indigenous Art
                </h1>
                <div className="About-initial-content">
                  <p>
                    The Virtual Platform for Indigenous Art (VPIA) was created
                    to help Indigenous and non-Indigenous communities build
                    relationships and share knowledge surrounding Indigenous
                    artworks.
                  </p>
                  <p>
                    Led by Dr. Gerald McMaster as part of the larger The
                    Entangled Gaze project at OCAD University’s Wapatah Centre
                    for Indigenous Visual Knowledge, the VPIA is designed to
                    facilitate Indigenous access, interpretation, and learning
                    from artwork collections held by museums and galleries
                    around the world. Through this work, museums and art
                    institutions gain valuable insight and opportunity for
                    meaningful dialogues about the meaning, importance, and
                    protocols of these artworks to Indigenous communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <img
            className="img-fluid container-fluid greyscale"
            src="../../assets/images/team.jpg"
            alt="Image of VPIA team"
          />
        </div>
        <div className="row">
          <div className="container-fluid">
            <div className="About-info-section">
              <div className="row About-bottom-content">
                <div className="col-md-4">
                  <p className="about-content">
                    The pilot of the VPIA specifically documents collections of
                    historical and contemporary Indigenous artworks that depict
                    non-Indigenous people, technologies and traditions. These
                    artworks offer valuable perspectives and insight into
                    processes of colonization, cultural contact, and Indigenous
                    philosophy, aesthetic, and research methodology.
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="about-content">
                    The VPIA sees Indigenous artwork as a research tool that
                    allows a better understanding of how Indigenous and
                    non-Indigenous knowledge, material traditions, and social
                    relationships continue to grow and change. The platform’s
                    wiki-style framework allows users to transform institutional
                    records about artworks into living documents that more
                    clearly explain that artwork’s significance to Indigenous
                    people. Users can make corrections to institutional records,
                    describe cultural protocols surrounding their viewing and
                    use, and add text, photos and videos to better situate the
                    artwork within their cultural context. This approach brings
                    us one step closer to the Indigenization of museum and
                    gallery collections.
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="about-content">
                    The VPIA recognizes that Indigenous cultures continue to
                    change and grow. To ensure its continued relevance and
                    applicability, the VPIA has been designed through a
                    flexible, open-framework model. All program code for the
                    VPIA software is open source, which means that is
                    non-proprietary and allows all users to change the platform
                    to best meet their needs. The wiki format of the VPIA’s
                    database allows the ongoing development of artwork records
                    through the addition of knowledge and media that best
                    express current day ideas about its presence, politics and
                    importance. The VPIA will continue to evolve and move in new
                    directions, alongside the networks of human relationships
                    that it facilitates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
