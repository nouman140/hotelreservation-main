import React from "react";
import Heading from "../../common/Heading";
import RecentCard from "./RecentCard";
import "./recent.css";

const Recent = ({ title, data }) => {
  return (
    <>
      <section className="recent padding">
        <div className="container">
          <Heading
            title={title}
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          />
          <RecentCard data={data} />
        </div>
      </section>
    </>
  );
};

export default Recent;
