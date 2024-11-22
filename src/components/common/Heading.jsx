import React from "react"; // Importing React library

// Define a functional component called Heading
const Heading = ({ title, subtitle }) => {
  return (
    <>
      <div className='heading'> {/* Container for the heading */}
        <h1>{title}</h1> {/* Displaying the title */}
        <p>{subtitle}</p> {/* Displaying the subtitle */}
      </div>
    </>
  );
};

export default Heading; // Exporting the Heading component as default
