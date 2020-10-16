import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import "./AnimatedButton.css";

const AnimatedButton = (props) => {
  return (
    <Button
      variant="primary"
      type="submit"
      className={props.className}
      disabled={props.isLoading}
      onClick={props.onClick}
    >
      {props.isLoading ? (
        <FontAwesomeIcon icon={["fas", "spinner"]} className="rotating mr-1" />
      ) : (
        <FontAwesomeIcon icon={props.icon} className="mr-1" />
      )}
      {props.children}
    </Button>
  );
};

export default AnimatedButton;
