import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
} from "reactstrap";
import "./hero.css";
import { getAllAccomodations } from "../../../store/main/mainThunk";
import { useDispatch, useSelector } from "react-redux";

const Hero = (props) => {
  const dispatch = useDispatch();
  const { accomdationsData } = useSelector((state) => state.main);
  const [locationsType, setLocationsType] = useState([]);
  const [propertyType, setPropertyType] = useState([]);

  useEffect(() => {
    if (accomdationsData.length > 0) {
      const uniqueCitiesSet = new Set();
      accomdationsData.forEach((item) => uniqueCitiesSet.add(item.city));
      const uniqueCitiesArray = Array.from(uniqueCitiesSet);
      setLocationsType(uniqueCitiesArray);

      const uniquePropertySet = new Set(); // Corrected variable name
      accomdationsData.forEach((item) => uniquePropertySet.add(item.type));
      const uniquePropertyArray = Array.from(uniquePropertySet); // Corrected variable name
      setPropertyType(uniquePropertyArray);
    }
  }, [accomdationsData]);

  useEffect(() => {
    dispatch(getAllAccomodations());
  }, []);

  return (
    <section className="hero">
      <Container>
        <Heading
          title="Search Your Next Home "
          subtitle="Find new & featured property located in your local city."
        />

        <Form className="flex">
          <Row className="w-100 justify-content-center">
            <Col xs="12 " md="5">
              <FormGroup className="box custom-form-group">
                <Label>City</Label>
                <Input
                  type="select"
                  value={props.location}
                  className="text-capitalize"
                  onChange={(e) => props.setLocation(e.target.value)}
                >
                  <option value="">--Select your location--</option>
                  {locationsType?.map((location, index) => (
                    <option
                      key={index}
                      value={location}
                      className="text-capitalize"
                    >
                      {location}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>

            <Col xs="12 " md="5">
              <FormGroup className="box mb-0">
                <Label>Property Type</Label>
                <Input
                  type="select"
                  value={props.property}
                  className="text-capitalize"
                  onChange={(e) => props.setProperty(e.target.value)}
                >
                  <option value="">--Property type--</option>
                  {propertyType?.map((property, index) => (
                    <option
                      key={index}
                      value={property}
                      className="text-capitalize"
                    >
                      {property}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            {/* 
            <Col xs="8" md="3">
              <FormGroup className="box mb-0">
                <Label>Price Range</Label>
                <InputGroup>
                  <span className="input-group-text">$</span>
                  <Input type="number" min={0} className="form-control mt-0" />
                </InputGroup>
              </FormGroup>
            </Col> */}

            <Col
              xs="6"
              md="2"
              className="d-flex justify-content-center align-items-center home__buttons"
            >
              <Button
                className="btn1 mt-3"
                color="success"
                type="button"
                onClick={(e) => props.handleSearch(e)}
              >
                <i className="fa fa-search"></i>
              </Button>
              <Button
                className="btn1 mt-3 mx-2"
                color="success"
                type="button"
                onClick={(e) => props.clearSearch(e)}
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </section>
  );
};

export default Hero;
