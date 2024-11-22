import React, { useEffect, useState } from "react"; // Importing necessary modules from React
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import { getAllAccomodations } from "../../store/main/mainThunk"; // Importing action creator from mainThunk file
import Back from "../common/Back"; // Importing the Back component
import "../home/featured/Featured.css"; // Importing CSS styles for the Services component
import FeaturedCard from "../home/featured/FeaturedCard"; // Importing the FeaturedCard component
import Recent from "../home/recent/Recent"; // Importing the Recent component
import img from "../images/services.jpg"; // Importing an image

const Services = () => {
  const [category, setCategory] = useState("ALL"); // State variable to manage selected category

  const dispatch = useDispatch(); // Initializing dispatch function from useDispatch hook
  const { accomdationsData } = useSelector((state) => state.main); // Extracting state variable using useSelector hook
  const [data, setData] = useState([]); // State variable to store filtered data based on category

  useEffect(() => {
    dispatch(getAllAccomodations()); // Fetching all accommodations data when component mounts
  }, []);

  useEffect(() => {
    if (accomdationsData?.length > 0) {
      setData(accomdationsData); // Updating data state with fetched accommodations data
    }
  }, [accomdationsData]);

  // Filtering data based on selected category
  useEffect(() => {
    if (category === "ALL") {
      setData(accomdationsData); // Setting data to all accommodations data if category is "ALL"
    } else {
      const foundCategory = accomdationsData?.filter(
        (item) => item.type?.toLowerCase() === category?.toLowerCase()
      ); // Filtering accommodations data based on category
      setData(foundCategory); // Updating data state with filtered data
    }
  }, [category]);

  return (
    <>
      {/* Services section */}
      <section className="services mb">
        {/* Back component with a title and cover image */}
        <Back
          name="Accomodations"
          title="Accomodations - All Accomodations"
          cover={img}
        />
        <div className="featured container">
          {/* FeaturedCard component to select category */}
          <FeaturedCard category={category} setCategory={setCategory} />
        </div>
      </section>
      {/* Recent component to display filtered data */}
      <Recent
        title={`All ${category === "ALL" ? "Accomodations" : `${category}s`} `}
        data={data}
      />
    </>
  );
};

export default Services;
