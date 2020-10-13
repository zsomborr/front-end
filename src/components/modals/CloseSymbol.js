import React from "react";

const CloseSymbol = (props) => {
  return (
    <div className="close-container" onClick={props.onClick}>
      <div></div>
      <div></div>
    </div>
  );
};

export default CloseSymbol;
