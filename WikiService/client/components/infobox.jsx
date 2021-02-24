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
            Image License
            <p
              id="TradeGothic"
              dangerouslySetInnerHTML={{
                __html: this.props.photo_license
              }}
            ></p>
          </div>

          <ul className="list-group list-group-flush">
            {display ? (
              <li className="list-group-item">
                Last Updated By {this.props.user_name}
                <p id="TradeGothic"></p>
              </li>
            ) : (
              ""
            )}
            <li className="list-group-item">
              <p>Holding Institution</p>
              <p
                id="TradeGothic"
                dangerouslySetInnerHTML={{
                  __html: this.props.institution
                }}
              ></p>
            </li>

            <li className="list-group-item">
              <p>Type</p>
              <p
                id="TradeGothic"
                dangerouslySetInnerHTML={{
                  __html: this.props.artwork_type
                }}
              ></p>
            </li>

            <li className="list-group-item">
              <p>Culture Group</p>
              <p
                id="TradeGothic"
                dangerouslySetInnerHTML={{
                  __html: this.props.culture_group
                }}
              ></p>
            </li>

            <li className="list-group-item">
              <p>Material</p>
              <p
                id="TradeGothic"
                dangerouslySetInnerHTML={{
                  __html: this.props.material
                }}
              ></p>
            </li>

            <li className="list-group-item">
              <p>Tags</p>
              <p
                id="TradeGothic"
                dangerouslySetInnerHTML={{
                  __html: this.props.tags
                }}
              ></p>
            </li>

            <li className="list-group-item">
              <b>What Changed in last edit</b>
              <p id="TradeGothic">{this.props.what_changed}</p>
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
