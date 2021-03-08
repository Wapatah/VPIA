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
    const display = this.props.display;
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
            <h6>Image License</h6>
            <p
              dangerouslySetInnerHTML={{
                __html: this.props.photo_license
              }}
            ></p>
          </div>

          <ul className="list-group list-group-flush">
            {display ? (
              <li className="list-group-item">
                <h6>Last Updated By</h6>
                <p>{this.props.user_name}</p>
              </li>
            ) : (
              ""
            )}
            <li className="list-group-item">
              <h6>Holding Institution</h6>
              <p
                dangerouslySetInnerHTML={{
                  __html: this.props.institution
                }}
              ></p>
            </li>

            <li className="list-group-item">
              <h6>Type</h6>
              <p
                dangerouslySetInnerHTML={{
                  __html: this.props.artwork_type
                }}
              ></p>
            </li>

            <li className="list-group-item">
              <h6>Culture Group</h6>
              <p
                dangerouslySetInnerHTML={{
                  __html: this.props.culture_group
                }}
              ></p>
            </li>

            <li className="list-group-item">
              <h6>Material</h6>
              <p
                dangerouslySetInnerHTML={{
                  __html: this.props.material
                }}
              ></p>
            </li>

            <li className="list-group-item">
              <h6>Tags</h6>
              <p
                dangerouslySetInnerHTML={{
                  __html: this.props.tags
                }}
              ></p>
            </li>

            <li className="list-group-item">
              <h6>What Changed in last edit</h6>
              <p>{this.props.what_changed}</p>
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
