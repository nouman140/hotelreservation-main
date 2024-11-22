import React from "react";
import Heading from "../../common/Heading";
import "./Featured.css";
import FeaturedCard from "./FeaturedCard";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

const Featured = () => {
  const location = useLocation();
  return (
    <>
      <section className="featured background">
        <div className="container">
          {location.pathname == "/" && (
            <Heading
              title="Property Types"
              subtitle="Find All Type of Property."
            />
          )}
          <FeaturedCard />
        </div>
      </section>
    </>
  );
};

export default Featured;
