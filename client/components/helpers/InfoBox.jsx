import React from "react";

const InfoBox = props => {
  return (
    <div>
      <p className="article-title">{props.title}</p>
      <p className="description">{props.description}</p>
    </div>
  );
};

export default InfoBox;
