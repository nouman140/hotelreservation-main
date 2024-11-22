import React from "react"; // Importing React library to create React components
import Back from "../common/Back"; // Importing Back component from '../common/Back' file
import RecentCard from "../home/recent/RecentCard"; // Importing RecentCard component from '../home/recent/RecentCard' file
import "../home/recent/recent.css"; // Importing styles for the RecentCard component
import img from "../images/about.jpg"; // Importing an image from '../images/about.jpg' file

// Define a functional component called Blog
const Blog = () => {
  return (
    <>
      {/* Start of the Blog section */}
      <section className='blog-out mb'>
        {/* Using the Back component with props */}
        <Back name='Blog' title='Blog Grid - Our Blogs' cover={img} />
        {/* Container for the content */}
        <div className='container recent'>
          {/* Rendering the RecentCard component */}
          <RecentCard />
        </div>
      </section>
    </>
  );
};

// Exporting the Blog component as default
export default Blog;
