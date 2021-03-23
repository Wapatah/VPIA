/* --------------------------------------------------------------------------------------------------------------------------------------------
  This is a reduced Article display for the purposes of showing the differences between different article revisions (through Article History).
*/
import React from "react";
import { Link } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";

class SimpleArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { article: {}, user: {} };
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Receives clicked archive and its id to display the simple article associated with it.
  componentWillReceiveProps(nextProps) {
    let myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token": window.localStorage.getItem("userToken")
    });
    let myInit = { method: "GET", headers: myHeaders };
    let that = this;

    fetch(
      `${process.env.HISTORYSERVICE}/api/archives/` + nextProps.archiveId,
      myInit
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          StatusAlertService.showError(response.error.message);
        } else {
          that.setState({ article: response.data });
        }
      })
      .then(() => {
        let myHeaders = new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": window.localStorage.getItem("userToken")
        });

        let myInit = { method: "GET", headers: myHeaders };
        let that = this;

        fetch(
          `${process.env.USERSERVICE}/api/users/` +
            that.state.article[0].user_id,
          myInit
        )
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            if (response.error.error) {
              StatusAlertService.showError(response.error.message);
            } else {
              that.setState({ user: response.data });
            }
          });
      });
  }

  getRawMarkupBody() {
    return { __html: this.state.article[0].body };
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Displays the article information in smaller detail.
  render() {
    let user_name = "";
    if (this.state.article[0] && this.state.user[0] && this.props.archiveId) {
      if (this.state.user[0]) {
        user_name = this.state.user[0].name;
      }
      return (
        <div>
          <StatusAlert />
          <div className="edit-history-heading">
            <h1 className="edit-history-h1">Edited by {user_name} </h1>
            <p className="float-right font-italic date">
              on{" "}
              {new Date(
                this.state.article[0].updated_at.replace(" ", "T")
              ).toUTCString()}
            </p>
          </div>
          <hr />
          <div className="article-heading">
            <div className="single-article-meta">
              <h1 className="edit-history-h1">Object Type: </h1>
              <p
                className="edit-history-text"
                dangerouslySetInnerHTML={{
                  __html: this.state.article[0].artwork_type
                }}
              ></p>
            </div>
            <div className="single-article-meta">
              Institution Attributed Culture Group{" "}
              <p
                className="edit-history-text"
                dangerouslySetInnerHTML={{
                  __html: this.state.article[0].culture_group
                }}
              ></p>
            </div>
            <div className="single-article-meta">
              <h1 className="edit-history-h1">Material: </h1>
              <p
                className="edit-history-text"
                dangerouslySetInnerHTML={{
                  __html: this.state.article[0].material
                }}
              ></p>
            </div>
          </div>
          <h1 className="edit-history-h1">Edits</h1>
          <hr />
          <p
            className="edit-history-text"
            dangerouslySetInnerHTML={this.getRawMarkupBody()}
          ></p>
        </div>
      );
    } else {
      return (
        <center>
          <p className="help-block">List of revisions done to this artwork can be found on the left. 
          Please select one to see it displayed in this section.
          </p>
        </center>
      );
    }
  }
}

export default SimpleArticle;
