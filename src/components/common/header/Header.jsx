import React, { useState } from "react"; // Importing React library and useState hook
import "./header.css"; // Importing styles for the Header component
import { nav } from "../../data/Data"; // Importing navigation data
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Collapse } from "reactstrap"; // Importing components from Reactstrap

import HomeEase from "../../images/HomeEase.png"; // Importing the HomeEase logo image
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import { SignOutUser } from "../../../store/auth/authThunk"; // Importing SignOutUser action from authThunk

// Define a functional component called Header
const Header = () => {
  const dispatch = useDispatch(); // useDispatch hook to dispatch actions
  const { uid } = useSelector((state) => state.auth); // useSelector hook to access Redux state
  const [navListOpen, setNavListOpen] = useState(false); // State for toggling navigation list

  // Function to toggle navigation list
  const toggleNavList = () => {
    setNavListOpen(!navListOpen);
  };

  return (
    <>
      {/* Header section */}
      <header>
        <Container fluid>
          {/* Navbar */}
          <Navbar light expand="md">
            <NavbarBrand>
              {/* Link to home page */}
              <Link to="/">
                {/* HomeEase logo */}
                <img src={HomeEase} alt="" className="logo" />
              </Link>
            </NavbarBrand>

            {/* Toggle button for mobile */}
            <Button onClick={toggleNavList} color="success" className="toggle-button d-md-none toggle">
              {/* Conditional rendering for toggle button icon */}
              {navListOpen ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </Button>

            {/* Collapse component for navigation links */}
            <Collapse isOpen={navListOpen} navbar>
              <Nav className="ml-auto small" navbar>
                {/* Mapping through navigation data and rendering NavLink components */}
                {nav.map(
                  (list, index) =>
                    // Render the NavLink only if nav.text is not "contact" or if the user is present
                    ((list.text.toLowerCase() !== "contact" &&
                      list.text.toLowerCase() !== "my bookings") ||
                      uid) && (
                      <NavItem key={index}>
                        <NavLink tag={Link} to={list.path}>
                          {list.text}
                        </NavLink>
                      </NavItem>
                    )
                )}
                {/* Conditional rendering for login/logout links */}
                {!uid ? (
                  <>
                    <NavItem className="d-md-none ml-0">
                      <NavLink to="/login" tag={Link}>
                        Sign In
                      </NavLink>
                    </NavItem>
                    <NavItem className="d-md-none">
                      <NavLink to="/signup" tag={Link}>
                        Sign Up
                      </NavLink>
                    </NavItem>
                  </>
                ) : (
                  <NavItem className="d-md-none">
                    <NavLink to="/" tag={Link} onClick={() => dispatch(SignOutUser())}>
                      Logout
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
            </Collapse>

            {/* Buttons for desktop view */}
            <div className="button d-none d-md-flex">
              {/* Conditional rendering for login/logout buttons */}
              {!uid ? (
                <>
                  <Link to="/login">
                    <Button className="btn1 mb-3" color="success">
                      <i className="fa fa-sign-out"></i> Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="btn1 mb-3" color="success">
                      <i className="fa fa-sign-out"></i> Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <Button className="btn1 mb-3" color="success" onClick={() => dispatch(SignOutUser())}>
                  <i className="fa fa-sign-out"></i> Logout
                </Button>
              )}
            </div>
          </Navbar>
        </Container>
      </header>
    </>
  );
};

export default Header; // Exporting the Header component as default
