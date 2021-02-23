/* --------------------------------------------------------------------------------------------------------------------------------------------
  This component renders the main Wiki page Article and deals
  with all of the API needed.
*/
import React from "react";
import { Link, hashHistory } from "react-router";
import Loader from "./helpers/loader.jsx";
import StatusAlert, { StatusAlertService } from "react-status-alert";

class InfoBox extends React.Component {
  render() {
    return (
      <div className="col-md-3 article-info-box">
        <div className="card">
          <div
            className="my-card-img-top"
            dangerouslySetInnerHTML={{
              __html: this.props.photo
            }}
          ></div>
          <div className="list-group-item">
            Image License
            <p
              id="Baskerville"
              dangerouslySetInnerHTML={{
                __html: this.props.photo_license
              }}
            ></p>
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Last Updated By {this.props.user_name}
              <p id="Baskerville"></p>
            </li>
            <li className="list-group-item">
              <p id="FuturaStdHeavy">Holding Institution</p>
              <p
                id="Baskerville"
                dangerouslySetInnerHTML={{
                  __html: this.props.institution
                }}
              ></p>
            </li>

            <li className="list-group-item">
              <p id="FuturaStdHeavy">Type</p>
              <p
                id="Baskerville"
                dangerouslySetInnerHTML={{
                  __html: this.props.artwork_type
                }}
              ></p>
            </li>

            <li className="list-group-item">
              <p id="FuturaStdHeavy">Culture Group</p>
              <p
                id="Baskerville"
                dangerouslySetInnerHTML={{
                  __html: this.props.culture_group
                }}
              ></p>
            </li>

            <li className="list-group-item">
              <p id="FuturaStdHeavy">Material</p>
              <p
                id="Baskerville"
                dangerouslySetInnerHTML={{
                  __html: this.props.material
                }}
              ></p>
            </li>

            <li className="list-group-item">
              <p id="FuturaStdHeavy">Tags</p>
              <p
                id="Baskerville"
                dangerouslySetInnerHTML={{
                  __html: this.props.tags
                }}
              ></p>
            </li>

            <li className="list-group-item">
              <b>What Changed in last edit</b>
              <p id="Baskerville">{this.props.what_changed}</p>
            </li>
          </ul>

          {window.localStorage.getItem("admin") === "1" ? (
            <button
              className="btn btn-primary btn-block"
              onClick={this.props.delete}
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default InfoBox;
