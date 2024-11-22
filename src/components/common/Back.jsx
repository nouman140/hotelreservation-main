import React from "react"; // Importing React library

// Define a functional component called Back
const Back = ({ name, title, cover }) => {
  return (
    <>
      <div className='back'> {/* Container for the background section */}
        <div className='container'> {/* Container for the text content */}
          <span>{name}</span> {/* Displaying the name */}
          <h1>{title}</h1> {/* Displaying the title */}
        </div>
        <img src={cover} alt='' /> {/* Displaying the background image */}
      </div>
    </>
  );
};

export default Back; // Exporting the Back component as default
