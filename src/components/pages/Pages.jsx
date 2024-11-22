import React from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // Importing necessary components from react-router-dom
import Home from "../home/Home"; // Importing the Home component
import Footer from "../common/footer/Footer"; // Importing the Footer component
import Services from "../services/Services"; // Importing the Services component
import Contact from "../contact/Contact"; // Importing the Contact component
import Login from "../common/login/Login"; // Importing the Login component
import Signup from "../common/signup/Signup"; // Importing the Signup component
import SingleAccomodation from "../SingleAccomodation"; // Importing the SingleAccomodation component
import MyBookings from "../MyBookings"; // Importing the MyBookings component
import ForgetPassword from "../common/login/ForgetPassword"; // Importing the ForgetPassword component

const Pages = () => {
  return (
    <>
      <Router> {/* Setting up BrowserRouter as Router */}
        <Header /> {/* Rendering the Header component */}
        <Switch> {/* Using Switch to render only one matching route */}
          {/* Defining routes */}
          <Route exact path="/" component={Home} /> {/* Route for Home component */}
          <Route exact path="/services" component={Services} /> {/* Route for Services component */}
          <Route exact path="/contact" component={Contact} /> {/* Route for Contact component */}
          <Route exact path="/mybookings" component={MyBookings} /> {/* Route for MyBookings component */}
          <Route exact path="/service/:id" component={SingleAccomodation} /> {/* Route for SingleAccomodation component with dynamic id parameter */}
          <Route exact path="/login" component={Login} /> {/* Route for Login component */}
          <Route exact path="/signup" component={Signup} /> {/* Route for Signup component */}
          <Route exact path="/forget-password" component={ForgetPassword} /> {/* Route for ForgetPassword component */}
        </Switch>
        <Footer /> {/* Rendering the Footer component */}
      </Router>
    </>
  );
};

export default Pages;
