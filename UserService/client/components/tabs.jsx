import React from "react";

class Tabs extends React.Component {
  constructor(props) {
    super();
    this.state = {
      active: 0
    };
  }

  select(i) {
    let _this = this;
    return function() {
      _this.setState({
        active: i
      });
    };
  }

  renderTabs() {
    return React.Children.map(this.props.children, (item, i) => {
      if (i % 2 === 0) {
        let active = this.state.active === i ? "active" : "";
        return (
          <button
            onClick={this.select(i)}
            className={`${active} btn btn-outline-secondary affliation-btn`}
          >
            {item}
          </button>
        );
      }
    });
  }

  renderContent() {
    return React.Children.map(this.props.children, (item, i) => {
      if (i - 1 === this.state.active) {
        return <div className="content col-12">{item}</div>;
      } else {
        return;
      }
    });
  }

  render() {
    return (
      <div className="tabs row">
        <div className="col-7">
          <span className="text-danger">*</span> Do you have Affiliation with
          Indigenous cultural heritage?{" "}
          <small className="form-text text-muted help-text font-italic">
            Example: Indigenous community, Indigenous culture group,…
          </small>
        </div>
        <div className="col-5">{this.renderTabs()}</div>
        {this.renderContent()}
      </div>
    );
  }
}

export default Tabs;
