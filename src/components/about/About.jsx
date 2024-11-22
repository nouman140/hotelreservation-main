import React from "react"; // Importing React library to create React components
import Back from "../common/Back"; // Importing Back component from '../common/Back' file
import Heading from "../common/Heading"; // Importing Heading component from '../common/Heading' file
import img from "../images/about.jpg"; // Importing an image from '../images/about.jpg' file
import "./about.css"; // Importing styles for the About component

// Define a functional component called About
const About = () => {
  return (
    <>
      {/* Start of the About section */}
      <section className='about'>
        {/* Using the Back component with props */}
        <Back name='About Us' title='About Us - Who We Are?' cover={img} />
        {/* Container for the content */}
        <div className='container flex mtop'>
          {/* Left side content */}
          <div className='left row'>
            {/* Heading component with title and subtitle */}
            <Heading title='Our Agency Story' subtitle='Check out our company story and work process' />

            {/* Paragraphs describing the company */}
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
            {/* Button to navigate to more about us */}
            <button className='btn2'>More About Us</button>
          </div>
          {/* Right side content */}
          <div className='right row'>
            {/* Image displaying about the company */}
            <img src='./immio.jpg' alt='' />
          </div>
        </div>
      </section>
    </>
  );
};

// Exporting the About component as default
export default About;
