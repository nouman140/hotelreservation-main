import React, { useState } from "react"; // Importing React library and useState hook
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from "reactstrap"; // Importing components from Reactstrap
import { forgetPasswordAction } from "../../../store/auth/authThunk"; // Importing forgetPasswordAction from authThunk
import HomeEase from "../../images/HomeEase.png"; // Importing the HomeEase logo image
import img from "../../images/pricing.jpg"; // Importing an image
import Back from "../Back"; // Importing the Back component
import "./login.css"; // Importing styles for the ForgetPassword component

// Define a functional component called ForgetPassword
const ForgetPassword = () => {
  const dispatch = useDispatch(); // useDispatch hook to dispatch actions
  const { authLoading } = useSelector((state) => state.auth); // useSelector hook to access Redux state
  const [email, setEmail] = useState(""); // State to store the email input value

  // Function to handle form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    let payload = { email }; // Payload object with email
    dispatch(forgetPasswordAction(payload)); // Dispatching forgetPasswordAction with payload
  };

  return (
    <section className="contact mb"> {/* Contact section */}
      <Back name="Forget Password" title="Enter Your Email and get your Account back" cover={img} /> {/* Back component */}
      <div className="container"> {/* Container */}
        <Row className="d-flex justify-content-center"> {/* Row */}
          <Col lg="6" sm="12"> {/* Column */}
            <Form className="d-flex shadow flex-column justify-content-center align-items-center" onSubmit={(e) => handleLogin(e)}> {/* Form */}
              <img src={HomeEase} alt="" className="logo" style={{ width: "100px" }} /> {/* HomeEase logo */}
              <h5 className="text-center">Forget Password</h5> {/* Title */}
              <div className="d-flex flex-column w-100 justify-content-center align-items-center"> {/* Container */}
                <FormGroup className="w-100 flex-column"> {/* Form group */}
                  <Label for="email" className="mb-8">Email</Label> {/* Label for email input */}
                  <Input type="email" name="email" id="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} /> {/* Email input */}
                </FormGroup>
                <Button color="success" disabled={authLoading || email === ""} className="btn2 px-4 w-50" type="submit"> {/* Submit button */}
                  {authLoading ? <Spinner size="sm" className="mx-auto" /> : "Submit"} {/* Conditional rendering of spinner or text based on authLoading state */}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ForgetPassword; // Exporting the ForgetPassword component as default
