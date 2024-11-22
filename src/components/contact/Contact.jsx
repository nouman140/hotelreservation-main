import React, { useEffect, useState } from "react";
import img from "../images/pricing.jpg"; // Importing the background image
import Back from "../common/Back"; // Importing the Back component
import "./contact.css"; // Importing the CSS styles
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import { contactAdminAction } from "../../store/main/mainThunk"; // Importing Redux action
import { Col, Row, Spinner } from "reactstrap"; // Importing Reactstrap components
import { useHistory } from "react-router-dom/cjs/react-router-dom"; // Importing useHistory from React Router DOM

const Contact = () => {
  const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions
  const history = useHistory(); // Initializing useHistory hook to manage browser history
  const { uid, user } = useSelector((state) => state.auth); // Extracting user data from Redux store
  const { contactLoading } = useSelector((state) => state.main); // Extracting contact loading state from Redux store
  const [contactForm, setContactForm] = useState({ // Initializing contactForm state variable
    subject: "",
    message: "",
  });

  useEffect(() => { // useEffect hook to redirect to login page if user is not authenticated
    if (!uid) {
      history.push("/login");
    }
  }, [uid]); // Dependency array ensures useEffect runs when uid changes

  return (
    <>
      <section className="contact mb"> {/* Contact section */}
        <Back // Back component for navigation
          name="Contact Us"
          title="Get Helps & Friendly Support"
          cover={img} // Background image
        />
        <div className="container"> {/* Container for contact form */}
          <form // Contact form
            className="shadow" // CSS class for styling
            onSubmit={(e) => { // Form submission handler
              e.preventDefault(); // Prevent default form submission
              let payload = { // Payload for contactAdminAction
                ...contactForm, // Subject and message from contactForm state
                userID: uid, // User ID
                email: user?.email, // User email
                name: user?.name, // User name
              };
              dispatch(contactAdminAction(payload)) // Dispatching action to contact admin
                .then(() => { // Promise resolves
                  setContactForm({ // Resetting form fields
                    subject: "",
                    message: "",
                  });
                })
                .catch((error) => { // Error handling
                  console.error("Error sending contact:", error);
                });
            }}
          >
            <h4>Fillup The Form</h4> <br /> {/* Form title */}
            <Row className="d-flex justify-content-center w-100 px-0"> {/* Row for form inputs */}
              <Col lg="6" md="6" sm="12"> {/* Column for name input */}
                <input
                  type="text"
                  disabled // Disabled input
                  placeholder="Name"
                  required // Required field
                  value={user?.name} // User's name
                  // onChange={(e) =>
                  //   setContactForm({ ...contactForm, name: e.target.value })
                  // }
                />
              </Col>
              <Col lg="6" md="6" sm="12"> {/* Column for email input */}
                <input
                  type="email"
                  placeholder="Email"
                  required // Required field
                  disabled // Disabled input
                  value={user?.email} // User's email
                  // onChange={(e) =>
                  //   setContactForm({ ...contactForm, email: e.target.value })
                  // }
                />
              </Col>
            </Row>
            <input // Subject input
              type="text"
              placeholder="Subject"
              required // Required field
              value={contactForm.subject} // Subject value
              onChange={(e) =>
                setContactForm({ ...contactForm, subject: e.target.value })
              }
            />
            <textarea // Message textarea
              cols="30"
              rows="10"
              required // Required field
              value={contactForm.message} // Message value
              onChange={(e) =>
                setContactForm({ ...contactForm, message: e.target.value })
              }
            ></textarea>
            <button type="submit" disabled={contactLoading}> {/* Submit button */}
              {contactLoading ? ( // Display spinner if contact is loading
                <Spinner size="sm" className="mx-5" />
              ) : (
                "Submit Request"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
