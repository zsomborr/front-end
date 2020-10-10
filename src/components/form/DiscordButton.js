import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DiscordButton.css";

const DiscordButton = (props) => {
  const [isConnected, setConnected] = useState(false);
  const [username, setUsername] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (window.location.pathname !== "/settings/discord/auth") {
      return;
    }

    const getUserDetails = async () => {
      try {
        setLoading(true);
        const response = await props.discordService.getUser();
        await props.studentService.connectWithDiscord(response.data);
        setUsername(response.data.username);
        setConnected(true);
      } catch (e) {}
      setLoading(false);
    };

    getUserDetails();
  }, [props.discordService, props.studentService]);

  useEffect(() => {
    setUsername(props.username);
    setConnected(props.username !== null);
  }, [props.username]);

  if (isConnected) {
    return (
      <Button variant="info" disabled={true} className="btn-discord">
        <FontAwesomeIcon icon={["fab", "discord"]} className="mr-2" /> @
        {username}
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
