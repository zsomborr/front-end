import React, { Fragment } from "react";

const WebsiteDescription = () => {
  return (
    <Fragment>
      <span className="h3">Codecool's Peer Mentoring App</span>

      <blockquote class="blockquote">
        <p class="mb-0">
          A web application for Codecool's student all around the world to
          connect and ask for help.
        </p>
        <footer class="blockquote-footer">
          Who needs Stackoverflow, when you have <br></br>
          <cite title="Codecool's Peer Mentoring App">
            Codecool's Peer Mentoring App?
          </cite>
        </footer>
      </blockquote>
    </Fragment>
  );
};

export default WebsiteDescription;
