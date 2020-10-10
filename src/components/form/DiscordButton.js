import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DiscordButton.css";

const DiscordButton = (props) => {
  const [isConnected] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (window.location.pathname !== "/settings/discord/auth") {
      return;
    }

    const getUserDetails = async () => {
      try {
        setLoading(true);
        const response = await props.discordService.getUser();
        alert(
          "Discord's answer:\n" +
            JSON.stringify(response.data)
              .replace(/,/g, ",\n")
              .replace("{", "{\n")
              .replace("}", "\n}")
        );
      } catch (e) {}
      setLoading(false);
    };

    getUserDetails();
  }, [props.discordService]);

  if (isConnected) {
    return (
      <Button
        variant="outline-danger"
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
      onClick={(e) => (window.location.href = props.discordService.authURL)}
      disabled={isLoading}
    >
      <FontAwesomeIcon icon={isLoading ? "sync" : "link"} className="mr-2" />
      {isLoading ? "Connecting ..." : "Connect with Discord"}
    </Button>
  );
};

export default DiscordButton;
