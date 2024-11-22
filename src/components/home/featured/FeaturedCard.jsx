import React from "react";
import { featured } from "../../data/Data";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";

const FeaturedCard = ({ category, setCategory }) => {
  const location = useLocation();
  const history = useHistory();
  return (
    <>
      <div className="content grid5 mtop">
        {featured?.map((items, index) => (
          <div
            className="box"
            key={index}
            onClick={() => {
              if (location.pathname == "/") {
                history.push("/services");
              } else {
                console.log({ category, name: items.name });
                setCategory(items.name);
              }
            }}
          >
            <img src={items.cover} alt="" />
            <h6>{items.name}</h6>
            <label>{items.total}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedCard;
