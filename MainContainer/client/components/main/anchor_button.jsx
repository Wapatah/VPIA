/* --------------------------------------------------------------------------------------------------------------------------------------------
  This component renders the anchor button
*/
import React from "react";

class AnchorButton extends React.Component {
  render() {
    return (
      <a href={this.props.anchor_id} className="btn btn-block anchor-button">
        {this.props.anchor_name}
        <span className="float-right anchor-arrow">
          <svg
            id="arrow"
            xmlns="http://www.w3.org/2000/svg"
            width="15.359"
            height="24.223"
            viewBox="0 0 15.359 24.223"
          >
            <path
              id="arrow-2"
              data-name="arrow"
              d="M12.111,15.359a2.146,2.146,0,0,1-1.7-.768L.727,4.352a2.573,2.573,0,0,1,0-3.584,2.256,2.256,0,0,1,3.391,0l7.993,8.448L20.1.768a2.256,2.256,0,0,1,3.391,0,2.573,2.573,0,0,1,0,3.584l-9.689,10.24A2.146,2.146,0,0,1,12.111,15.359Z"
              transform="translate(0 24.223) rotate(-90)"
            />
          </svg>
        </span>
      </a>
    );
  }
}

export default AnchorButton;
