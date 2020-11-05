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
            className={`${active} btn btn-outline-secondary affiliation-btn`}
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
        return <div>{item}</div>;
      } else {
        return;
      }
    });
  }

  render() {
    return (
      <div>
        <div className="col-sm-11 float-right mt-3 mb-3">
          Do you identify with an Indigenous community, culture group, and/or
          cultural heritage?
          <span className="text-danger">*</span> {this.renderTabs()}
        </div>
        {this.renderContent()}
      </div>
    );
  }
}

export default Tabs;
