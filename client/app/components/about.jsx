import React from "react";

class About extends React.Component {
  render() {
    return (
      <div id="About-page" className="mw">
        <div className="row">
          <div className="container-fluid">
            <div id="About-intro-section">
              <div>
                <div className="row">
                  <div className="col">
                    <img
                      src="../../assets/logos/logo-white.png"
                      alt="White logo"
                    />
                  </div>
                  <div className="col">
                    <div id="About-header">
                      About the Virtual Platform for Indigenous Art
                    </div>
                    <div id="About-initial-content">
                      <p className="w-75">
                        The Virtual Platform for Indigenous Art (VPIA) was
                        created to help Indigenous and non-Indigenous
                        communities build relationships and share knowledge
                        surrounding Indigenous artworks.
                      </p>
                      <p className="w-75">
                        Led by Dr. Gerald McMaster as part of the larger The
                        Entangled Gaze project at OCAD University’s Wapatah
                        Centre for Indigenous Visual Knowledge, the VPIA is
                        designed to facilitate Indigenous access,
                        interpretation, and learning from artwork collections
                        held by museums and galleries around the world. Through
                        this work, museums and art institutions gain valuable
                        insight and opportunity for meaningful dialogues about
                        the meaning, importance, and protocols of these artworks
                        to Indigenous communities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer text-center">
                <div id="About-image-text-box" className="row align-items-end">
                  <div id="About-middle-text" className="col-4">
                    <p className="float-right">A Project in Motion</p>
                  </div>
                  <div className="col">
                    <div id="About-tint" className="card border-0 float-left">
                      <img
                        className="img-responsive"
                        src="../../assets/img/eric.png"
                        alt="Image of Eric"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            id="About-image-section"
            className="container-fluid img-responsive"
          >
            <div id="About-tint" className="card border-0">
              <img src="../../assets/img/team.png" alt="Image of VPIA team" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container-fluid">
            <div id="About-info-section">
              <div id="About-bottom-content" class="row">
                <div class="col">
                  The pilot of the VPIA specifically documents collections of
                  historical and contemporary Indigenous artworks that depict
                  non-Indigenous people, technologies and traditions. These
                  artworks offer valuable perspectives and insight into
                  processes of colonization, cultural contact, and Indigenous
                  philosophy, aesthetic, and research methodology.
                </div>
                <div class="col">
                  The VPIA sees Indigenous artwork as a research tool that
                  allows a better understanding of how Indigenous and
                  non-Indigenous knowledge, material traditions, and social
                  relationships continue to grow and change. The platform’s
                  wiki-style framework allows users to transform institutional
                  records about artworks into living documents that more clearly
                  explain that artwork’s significance to Indigenous people.
                  Users can make corrections to institutional records, describe
                  cultural protocols surrounding their viewing and use, and add
                  text, photos and videos to better situate the artwork within
                  their cultural context. This approach brings us one step
                  closer to the Indigenization of museum and gallery
                  collections.
                </div>
                <div class="col">
                  The VPIA recognizes that Indigenous cultures continue to
                  change and grow. To ensure its continued relevance and
                  applicability, the VPIA has been designed through a flexible,
                  open-framework model. All program code for the VPIA software
                  is open source, which means that is non-proprietary and allows
                  all users to change the platform to best meet their needs. The
                  wiki format of the VPIA’s database allows the ongoing
                  development of artwork records through the addition of
                  knowledge and media that best express current day ideas about
                  its presence, politics and importance. The VPIA will continue
                  to evolve and move in new directions, alongside the networks
                  of human relationships that it facilitates.
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
