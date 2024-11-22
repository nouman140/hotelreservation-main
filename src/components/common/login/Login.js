import React, { useState } from "react"; // Importing React library and useState hook
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Spinner,
} from "reactstrap"; // Importing components from Reactstrap
import img from "../../images/pricing.jpg"; // Importing an image
import Back from "../Back"; // Importing the Back component
import "./login.css"; // Importing styles for the Login component
import HomeEase from "../../images/HomeEase.png"; // Importing the HomeEase logo image
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import { loginUser } from "../../../store/auth/authThunk"; // Importing loginUser action from authThunk
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom

// Define a functional component called Login
const Login = () => {
  const dispatch = useDispatch(); // useDispatch hook to dispatch actions
  const { authLoading } = useSelector((state) => state.auth); // useSelector hook to access Redux state
  const [email, setEmail] = useState(""); // State to store the email input value
  const [password, setPassword] = useState(""); // State to store the password input value

  // Function to handle form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    let payload = { email, password }; // Payload object with email and password
    dispatch(loginUser(payload)); // Dispatching loginUser action with payload
  };

  return (
    <>
      <section className="contact mb"> {/* Contact section */}
        <Back name="Login" title="Sign in to Your Account" cover={img} /> {/* Back component */}
        <div className="container"> {/* Container */}
          <Row className="d-flex justify-content-center"> {/* Row */}
            <Col lg="6" sm="12"> {/* Column */}
              <Form className="d-flex shadow flex-column justify-content-center align-items-center" onSubmit={handleLogin}> {/* Form */}
                <img src={HomeEase} alt="" className="logo" style={{ width: "100px" }} /> {/* HomeEase logo */}
                <h5 className="text-center">Login</h5> {/* Title */}
                <div className="d-flex flex-column w-100 justify-content-center align-items-center"> {/* Container */}
                  <FormGroup className="w-100 flex-column"> {/* Form group for email */}
                    <Label for="email" className="mb-8">Email</Label> {/* Label for email input */}
                    <Input type="email" name="email" id="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} /> {/* Email input */}
                  </FormGroup>
                  <FormGroup className="w-100 flex-column"> {/* Form group for password */}
                    <Label for="password" className="mb-8">Password</Label> {/* Label for password input */}
                    <Input type="password" name="password" id="password" required placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} /> {/* Password input */}
                  </FormGroup>
                  <Button color="success" disabled={authLoading} className="btn2 px-4 w-50" type="submit"> {/* Submit button */}
                    {authLoading ? <Spinner size="sm" className="mx-auto" /> : "Login"} {/* Conditional rendering of spinner or text based on authLoading state */}
                  </Button>
                  <div className="my-2 text-start w-100"> {/* Forgot password link */}
                    <Link to="/forget-password">Forgot Password</Link>
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default Login; // Exporting the Login component as default
