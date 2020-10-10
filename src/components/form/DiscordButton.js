import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DiscordButton.css";

const DiscordButton = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5_000));
    setLoading(false);
    setIsConnected(!isConnected);
  };

  if (isConnected) {
    return (
      <Button
        variant="outline-danger"
        onClick={toggle}
        disabled={isLoading}
        className="btn-discord"
      >
        <FontAwesomeIcon
          icon={isLoading ? "user-slash" : "exclamation-triangle"}
          className="mr-2"
        />
        {isLoading ? "Revoking access ..." : "Disconnect from Discord"}
      </Button>
    );
  }

  return (
    <Button
      className="btn-discord connect"
      onClick={toggle}
      disabled={isLoading}
    >
      <FontAwesomeIcon icon={isLoading ? "sync" : "link"} className="mr-2" />
      {isLoading ? "Connecting ..." : "Connect with Discord"}
    </Button>
  );
};

export default DiscordButton;
