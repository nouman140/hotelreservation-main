import React, { useEffect, useState } from "react";
import Featured from "./featured/Featured"; // Importing the Featured component
import Hero from "./hero/Hero"; // Importing the Hero component
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import {
  clearSearchFilter,
  getSearchLocation,
  getTrendigProperties,
} from "../../store/main/mainThunk"; // Importing action creators from mainThunk file
import Recent from "./recent/Recent"; // Importing the Recent component

const Home = () => {
  const dispatch = useDispatch(); // Initializing dispatch function from useDispatch hook
  const { searchAccomodation, trendingProperties } = useSelector(
    (state) => state.main
  ); // Extracting state variables using useSelector hook

  // State variables for location, property, and search results
  const [location, setLocation] = useState("");
  const [property, setProperty] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  // Function to handle search based on user input
  const handleSearch = (e) => {
    e.preventDefault();
    if (property !== "" && location !== "") {
      dispatch(getSearchLocation({ location, property })); // Dispatching action to search for properties based on location and property type
    } else {
      alert("Select both fields"); // Alerting the user if both fields are not selected
    }
  };

  // Function to clear search filters
  const clearSearch = (e) => {
    e.preventDefault();
    setSearchResults(null); // Clearing search results
    setLocation(""); // Resetting location state
    setProperty(""); // Resetting property state
    dispatch(clearSearchFilter()); // Dispatching action to clear search filters
  };

  // useEffect to update search results when searchAccomodation changes
  useEffect(() => {
    if (searchAccomodation?.length > 0) {
      setSearchResults(searchAccomodation); // Updating search results with the fetched data
    } else {
      setSearchResults(null); // Resetting search results if no data is fetched
    }
  }, [searchAccomodation]);

  // useEffect to fetch trending properties when the component mounts
  useEffect(() => {
    dispatch(getTrendigProperties()); // Dispatching action to fetch trending properties
  }, []);

  return (
    <>
      <Hero
        location={location}
        setLocation={setLocation}
        property={property}
        setProperty={setProperty}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      /> {/* Rendering the Hero component with props */}
      <Featured /> {/* Rendering the Featured component */}
      
      {/* Rendering the Recent component based on search results or trending properties */}
      {searchResults !== null ? (
        <Recent title="Searched Properties" data={searchResults} />
      ) : (
        <Recent title="Trending Properties" data={trendingProperties} />
      )}
    </>
  );
};

export default Home;
