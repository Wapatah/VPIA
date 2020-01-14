/* --------------------------------------------------------------------------------------------------------------------------------------------
  This is the unique loader component that appears when processes take too long.
  This is a helper function.
*/
import React from "react";

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "Loading..." };
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Onload, if the component times out, display error message.
  componentDidMount() {
    var that = this;
    this.timeout = setTimeout(function() {
      that.setState({
        message:
          "There seems to be a problem in processing your request. Please try again."
      });
    }, 10000);
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Onexit, clear timeout
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Display message
  render() {
    return (
      <div className="loader">
        <div className="loading"></div>
        <p className="help-block">{this.state.message}</p>
      </div>
    );
  }
}

export default Loader;
