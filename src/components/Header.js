import React, { Fragment, useContext, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Header() {
  const navBar = React.createRef();
  const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);

  const handleScroll = () => {
    if (window.pageYOffset < 50) {
      navBar.current.classList.add("unscrolled");
      navBar.current.classList.remove("scrolled");
    } else {
      navBar.current.classList.add("scrolled");
      navBar.current.classList.remove("unscrolled");
    }
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <Fragment>
      <div className="animated-navbar"></div>
      <div className="fixed-top container">
        <Navbar ref={navBar} expand="md" className="rounded unscrolled">
          <Link to={"/"}>
            <Navbar.Brand>
              <img
                src="https://journey.code.cool/static/assets/codecool_logo.png"
                alt="CodeCool logo"
                className="mr-1"
              ></img>
              Peer Mentor
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            {!isAuthenticated ? (
              <Fragment>
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
                <Link to={"/registration"} className="nav-link">
                  Registration
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Link to={"/questions"} className="nav-link">
                  Questions
                </Link>
                <Link to={"/settings"} className="nav-link">
                  Settings
                </Link>
              </Fragment>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </Fragment>
  );
}
