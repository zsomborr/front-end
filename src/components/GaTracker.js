import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const GaTracker = () => {
  const TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      ReactGA.initialize(TRACKING_ID);
      setInitialized(true);
    }
  }, [TRACKING_ID]);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search);
      console.log(location);
    }
  }, [initialized, location]);

  return <></>;
};

export default GaTracker;
