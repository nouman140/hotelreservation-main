import React, { useEffect, useState } from "react"; // Importing necessary modules from React
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Form,
  Input,
  Row,
  Col,
  Spinner,
} from "reactstrap"; // Importing components from reactstrap library
import { AddReservation } from "../store/main/mainThunk"; // Importing action creator from mainThunk file

const ReservationModal = ({ modal, toggle, data }) => {
  const dispatch = useDispatch(); // Initializing dispatch function from useDispatch hook
  const { uid, user } = useSelector((state) => state.auth); // Extracting uid and user from state using useSelector hook
  const currentDate = new Date().toISOString().split("T")[0]; // Getting current date
  const [checkinDate, setCheckinDate] = useState(""); // State variable for check-in date
  const [checkoutDate, setcheckoutDate] = useState(""); // State variable for check-out date
  const [totalNights, setTotalNights] = useState(""); // State variable for total nights of stay
  const [loader, setLoader] = useState(false); // State variable to manage loading spinner

  // Function to calculate total stay nights
  function calculateStayNights(checkinDate, checkoutDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const diffDays = Math.round(Math.abs((checkout - checkin) / oneDay));
    return diffDays;
  }

  // Effect to update total nights when check-in or check-out date changes
  useEffect(() => {
    if (checkinDate && checkoutDate) {
      const totalStayNights = calculateStayNights(checkinDate, checkoutDate);
      setTotalNights(totalStayNights);
    }
  }, [checkinDate, checkoutDate]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true); // Show loader
    let payload = {
      reservationDates: {
        checkinDate,
        checkoutDate,
      },
      accomodationID: data?.id,
      reservedByID: uid,
      userName: user?.name,
      totalCost: Number(data?.price) * totalNights,
      totalNights,
      status: "reserved",
      checkedInStatus: "pending",
    };
    dispatch(
      AddReservation({
        payload,
        onSuccess: () => {
          setLoader(false); // Hide loader
          setCheckinDate(""); // Reset check-in date
          setcheckoutDate(""); // Reset check-out date
          setTotalNights(""); // Reset total nights
          toggle(); // Close modal
        },
      })
    );
  };

  return (
    <div>
      {" "}
      {/* Reservation Modal */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="text-capitalize">
          {data?.type} in {data?.city}, {data?.country}
        </ModalHeader>
        <ModalBody>
          {/* Displaying availability status */}
          {data?.availibilty !== "immediate booking" ? (
            <p className="text-center text-danger mb-0">
              This {data?.type} is {data?.availibilty} {data?.availableFrom}
              {data?.availibilty !== "available from" && (
                <span>would you like to reserve it after ?</span>
              )}
            </p>
          ) : (
            <p className="text-center text-danger mb-0">
              ** This {data?.type} is available for {data?.availibilty}. **
            </p>
          )}

          {/* Reservation Form */}
          <Form className="mt-2 py-3" onSubmit={handleSubmit}>
            <Row>
              {/* Check-in date input */}
              <Col lg="6" md="6" sm="12">
                <FormGroup>
                  <Label>Check In</Label>
                  <Input
                    type="date"
                    min={data?.availableFrom || currentDate}
                    value={checkinDate}
                    onChange={(e) => setCheckinDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
              {/* Check-out date input */}
              <Col lg="6" sm="12">
                <FormGroup>
                  <Label>Check out</Label>
                  <Input
                    type="date"
                    disabled={checkinDate === ""}
                    min={checkinDate}
                    value={checkoutDate}
                    onChange={(e) => setcheckoutDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            {/* Displaying total nights and cost */}
            {totalNights && (
              <p className="text-center">
                you will be staying at the {data?.type} for{" "}
                <strong>{totalNights} Nights</strong>, the cost of the{" "}
                {data?.type} will be{" "}
                <strong className="text-danger">
                  {data?.currency}&nbsp;
                  {Number(data?.price) * totalNights}
                </strong>
              </p>
            )}
            {/* Form submission buttons */}
            <div className="d-flex justify-content-end align-items-center mt-4">
              {/* Cancel button */}
              <Button color="danger" type="button" className="mx-3">
                Cancel
              </Button>
              {/* Confirm button */}
              <Button
                color="success"
                disabled={checkinDate == "" || checkoutDate == "" || loader}
                type="submit"
              >
                {/* Show spinner while loading */}
                {loader ? <Spinner size="sm" className="mx-3" /> : "Confirm"}
              </Button>
            </div>
          </Form>
        </ModalBody>
        {/* 
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
};

export default ReservationModal;
