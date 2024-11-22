import React, { useEffect } from "react"; // Importing necessary modules from React
import Back from "./common/Back"; // Importing the Back component
import img from "../components/images/pricing.jpg"; // Importing an image
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row,
  Spinner,
  Table,
} from "reactstrap"; // Importing components from reactstrap library
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import { getMyReservations, updateReservation } from "../store/main/mainThunk"; // Importing action creators from mainThunk file
import ImagesSlider from "./home/recent/ImagesSlider"; // Importing the ImagesSlider component
import { useHistory } from "react-router-dom/cjs/react-router-dom"; // Importing useHistory hook from react-router-dom

const MyBookings = () => {
  const dispatch = useDispatch(); // Initializing dispatch function from useDispatch hook
  const history = useHistory(); // Initializing history object from useHistory hook
  const { uid } = useSelector((state) => state.auth); // Extracting uid from state using useSelector hook
  const { myReservations, accomodationLoading } = useSelector(
    (state) => state.main
  ); // Extracting myReservations and accomodationLoading from state using useSelector hook

  // Fetching user's reservations when uid changes
  useEffect(() => {
    if (uid) {
      dispatch(getMyReservations(uid));
    } else {
      history.push("/login"); // Redirecting to login page if user is not authenticated
    }
  }, [uid]);

  return (
    <>
      {/* My Bookings section */}
      <section className="contact mb">
        {/* Back component with a title and cover image */}
        <Back
          name="My Bookings"
          title="My bookings at Home Ease"
          cover={img}
        />
        <div className="container py-4">
          <h1 className="text-center">My Bookings</h1>
          {/* Conditionally rendering a spinner while data is loading */}
          {accomodationLoading ? (
            <Row className="justify-content-center">
              <Spinner />
            </Row>
          ) : (
            <Row className="my-3">
              {/* Mapping through myReservations and rendering each reservation */}
              {myReservations && myReservations?.length > 0 ? (
                <>
                  {myReservations?.map((val, index) => {
                    return (
                      <Col key={index} className="mb-3" sm="12" md="6" lg="4">
                        <Card className="product_card">
                          {/* ImagesSlider component to display images of accommodation */}
                          <ImagesSlider
                            cover={val?.accommodation?.images}
                            fullWidth={false}
                          />
                          <CardBody className="py-4">
                            {/* Displaying accommodation title, address, check-in, and check-out dates */}
                            <CardTitle tag="h6">
                              {val?.accommodation?.title}
                            </CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">
                              <i className="fa fa-location-dot"></i>{" "}
                              {val?.accommodation?.address}
                            </CardSubtitle>
                            <CardText className="mb-0 text-danger">
                              Check in -&nbsp;
                              <span className="text-dark">
                                {val.reservationDates?.checkinDate}
                              </span>
                            </CardText>
                            <CardText className="mb-0 text-danger">
                              Check out -{" "}
                              <span className="text-dark">
                                {val.reservationDates?.checkoutDate}
                              </span>
                            </CardText>
                            {/* Buttons to perform actions like Check In, Check Out, and Cancel */}
                            <div className="d-flex justify-content-between align-items-center mt-4">
                              {/* Button to display total cost */}
                              <Button className="btn2 px-3" color="success">
                                {val?.accommodation?.currency}{" "}
                                {val?.totalCost || 0}
                              </Button>
                              {/* Button to perform Check In */}
                              {val?.checkedInStatus == "pending" ? (
                                <Button
                                  className="btn2 px-3"
                                  color="info"
                                  disabled={val.status == "cancelled"}
                                  onClick={() =>
                                    dispatch(
                                      updateReservation({
                                        status: "Check in",
                                        ID: val.id,
                                        payload: {
                                          checkedInStatus: "checkin",
                                        },
                                      })
                                    )
                                  }
                                >
                                  Check In
                                </Button>
                              ) : (
                                // Button to perform Check Out
                                <Button
                                  className="btn2 px-3"
                                  color="warning"
                                  disabled={val.checkedInStatus == "checkout"}
                                  onClick={() =>
                                    dispatch(
                                      updateReservation({
                                        status: "Check out",
                                        ID: val.id,
                                        payload: {
                                          checkedInStatus: "checkout",
                                        },
                                      })
                                    )
                                  }
                                >
                                  {val.checkedInStatus == "checkout"
                                    ? "Checked Out"
                                    : "Check Out"}
                                </Button>
                              )}
                              {/* Button to cancel reservation */}
                              <Button
                                className="btn2 px-3"
                                color="danger"
                                disabled={
                                  val.status == "cancelled" ||
                                  val.checkedInStatus == "checkout" ||
                                  val.checkedInStatus == "checkin"
                                }
                                onClick={() => {
                                  const confirmation = window.confirm(
                                    "Are you sure you want to cancel the reservation?"
                                  );
                                  if (confirmation) {
                                    dispatch(
                                      updateReservation({
                                        status: "Cancellation",
                                        ID: val.id,
                                        payload: {
                                          status: "cancelled",
                                        },
                                      })
                                    );
                                  }
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    );
                  })}
                </>
              ) : (
                <></> // Render nothing if there are no reservations
              )}
            </Row>
          )}
        </div>
      </section>
    </>
  );
};

export default MyBookings;
