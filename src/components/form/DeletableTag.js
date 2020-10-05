import React, { useState } from "react";
import { Button } from "react-bootstrap";

const DeletableTag = (props) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDelete = () => {
    props.onDelete(props.name);
    setIsConfirming(false);
  };

  if (isConfirming) {
    return (
      <span className="btn btn-outline-danger mr-2 mb-2">
        Are You sure?
        <span onClick={handleDelete}>
          <i className="fa fa-check mx-2"></i>
        </span>
        -
        <span onClick={(e) => setIsConfirming(false)}>
          <i className="fa fa-times ml-2"></i>
        </span>
      </span>
    );
  }

  return (
    <Button
      type="button"
      key={`tag-${props.name}`}
      variant="outline-primary mr-2 mb-2"
      onClick={(e) => setIsConfirming(true)}
    >
      {props.name}
    </Button>
  );
};

export default DeletableTag;
