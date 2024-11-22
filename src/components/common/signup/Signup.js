import React, { useState } from "react"; // Importing React library and useState hook
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Spinner,
} from "reactstrap"; // Importing components from Reactstrap
import img from "../../images/pricing.jpg"; // Importing an image
import Back from "../Back"; // Importing the Back component
import HomeEase from "../../images/HomeEase.png"; // Importing the HomeEase logo image
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import { registerUser } from "../../../store/auth/authThunk"; // Importing registerUser action from authThunk

// Define a functional component called SignUp
const SignUp = () => {
  const dispatch = useDispatch(); // useDispatch hook to dispatch actions
  const { authLoading } = useSelector((state) => state.auth); // useSelector hook to access Redux state
  const [registerForm, setRegisterForm] = useState({ // State to store the registration form data
    email: "",
    name: "",
    password: "",
  });

  // Function to handle form submission
  const handleRegister = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(registerUser(registerForm)); // Dispatching registerUser action with registration form data
  };

  return (
    <>
      <section className="contact mb"> {/* Contact section */}
        <Back name="Sign Up" title="Register Your Account" cover={img} /> {/* Back component */}
        <div className="container"> {/* Container */}
          <Row className="d-flex justify-content-center"> {/* Row */}
            <Col lg="6" sm="12"> {/* Column */}
              <Form className="d-flex shadow flex-column justify-content-center align-items-center" onSubmit={handleRegister}> {/* Form */}
                <img src={HomeEase} alt="" className="logo" style={{ width: "100px" }} /> {/* HomeEase logo */}
                <h5 className="text-center">Sign Up</h5> {/* Title */}
                <FormGroup className="w-100 flex-column"> {/* Form group for name */}
                  <Label for="name" className="mb-8">Name</Label> {/* Label for name input */}
                  <Input type="text" name="name" id="name" required placeholder="Enter your Full Name" value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} /> {/* Name input */}
                </FormGroup>
                <FormGroup className="w-100 flex-column"> {/* Form group for email */}
                  <Label for="email" className="mb-8">Email</Label> {/* Label for email input */}
                  <Input type="email" name="email" id="email" required placeholder="Enter your email" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} /> {/* Email input */}
                </FormGroup>
                <FormGroup className="w-100 flex-column"> {/* Form group for password */}
                  <Label for="password" className="mb-8">Password</Label> {/* Label for password input */}
                  <Input type="password" name="password" id="password" required placeholder="Enter your password" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} /> {/* Password input */}
                </FormGroup>
                <Button color="success" disabled={authLoading} className="btn2 px-4" type="submit"> {/* Submit button */}
                  {authLoading ? <Spinner size="sm" className="mx-auto" /> : "Register"} {/* Conditional rendering of spinner or text based on authLoading state */}
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default SignUp; // Exporting the SignUp component as default
