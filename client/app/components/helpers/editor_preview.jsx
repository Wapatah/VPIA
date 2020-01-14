/* 
  Put all small code snippets inside the helpers folder.
  Simple editor preview, separated for easier modification
*/
import React from "react";

class EditorPreview extends React.Component {
  render() {
    return (
      <div className="editor-preview">
        <h2>
          <b>Preview</b>
        </h2>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: this.props.data }}></div>
      </div>
    );
  }
}

export default EditorPreview;
