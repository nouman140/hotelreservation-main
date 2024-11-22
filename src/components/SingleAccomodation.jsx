import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Row,
  Spinner,
} from "reactstrap";
import ImagesSlider from "./home/recent/ImagesSlider";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleAccomdation } from "../store/main/mainThunk";
import ReservationModal from "./ReservationModal";

const SingleAccomodation = () => {
  const dispatch = useDispatch(); // Initialize dispatch function from useDispatch hook
  const { id } = useParams(); // Get the parameter from the URL
  const { accomodationLoading, singleAccomodation } = useSelector(
    (state) => state.main
  ); // Extract accommodation loading state and single accommodation data from Redux store

  // State variables
  const [accomodation, setAccomodation] = useState(null); // State variable to hold accommodation data
  const { uid } = useSelector((state) => state.auth); // Extract user ID from Redux store
  const [modal, setModal] = useState(false); // State variable for modal visibility
  const toggle = () => setModal(!modal); // Toggle modal visibility function

  // Function to toggle reservation modal, checking user authentication
  const toggleReservationModal = () => {
    if (uid) {
      toggle(); // Open modal if user is authenticated
    } else {
      const confirmResult = window.confirm(
        "Reservation needs the user to login first. Do you want to continue to login to the platform?"
      ); // Confirm login prompt
      if (confirmResult) {
        window.location.href = "/login"; // Redirect to login page if confirmed
      }
    }
  };

  // Fetch single accommodation data on component mount
  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0); // Scroll to top of page
      dispatch(getSingleAccomdation(id)); // Dispatch action to fetch single accommodation data
    }
  }, [id]);

  // Update state with fetched single accommodation data
  useEffect(() => {
    if (singleAccomodation) {
      setAccomodation(singleAccomodation);
    }
  }, [singleAccomodation]);

  return (
    <div>
      {/* Single Accommodation Section */}
      <section className="recent padding">
        <div className="container py-5">
          {accomodationLoading ? ( // Show spinner if accommodation data is loading
            <Row className="justify-content-center">
              <Spinner />
            </Row>
          ) : (
            <>
              {accomodation && ( // Render accommodation data if available
                <>
                  {" "}
                  <h2 className="text-capitalize text-center mb-3">
                    {accomodation?.type} in {accomodation?.city} ,{" "}
                    {accomodation?.country}
                  </h2>
                  <Card
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {/* Slider for accommodation images */}
                    <ImagesSlider
                      cover={accomodation?.images}
                      fullWidth={true}
                    />
                    <CardBody className="py-4">
                      <CardTitle tag="h5">{accomodation?.title}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        <i className="fa fa-location-dot"></i>{" "}
                        {accomodation?.address}
                      </CardSubtitle>
                      <CardText className="mt-3">
                        {/* Display availability status */}
                        <Badge color="info" className="p-2 text-capitalize">
                          {accomodation?.availibilty +
                            " " +
                            accomodation?.availableFrom}
                        </Badge>
                      </CardText>
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        {/* Display price and type of accommodation */}
                        <Button className="btn2 px-3" color="success">
                          {accomodation?.currency + " " + accomodation?.price}
                        </Button>
                        <span className="property_type text-capitalize">
                          {accomodation?.type}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </>
              )}
            </>
          )}
          {/* Button to reserve accommodation */}
          <Row className="justify-content-center mt-4">
            <Button
              className="w-25"
              color="success"
              disabled={accomodationLoading}
              onClick={() => toggleReservationModal()}
            >
              Reserve Now
            </Button>
          </Row>
        </div>
      </section>{" "}
      {/* Reservation Modal */}
      <ReservationModal
        modal={modal}
        toggle={toggle}
        data={singleAccomodation}
      />
    </div>
  );
};

export default SingleAccomodation;
