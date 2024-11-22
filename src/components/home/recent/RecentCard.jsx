import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import ImagesSlider from "./ImagesSlider";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";

const RecentCard = ({ data }) => {
  const { accomodationLoading } = useSelector((state) => state.main);
  const history = useHistory();
  return (
    <>
      <Row className="justify-content-center">
        {accomodationLoading ? (
          <Spinner />
        ) : (
          <>
            {data?.map((val, index) => {
              return (
                <Col key={index} className="mb-3" sm="12" md="6" lg="4">
                  <Card className="product_card-2">
                    <ImagesSlider cover={val?.images} fullWidth={false} />
                    <CardBody
                      className="py-4"
                      onClick={() => history.push(`/service/${val.id}`)}
                    >
                      <CardTitle tag="h6">{val?.title}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        <i className="fa fa-location-dot"></i> {val?.address}
                      </CardSubtitle>
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <Button className="btn2 px-3" color="success">
                          {val.currency} {val?.price}
                        </Button>
                        <span className="property_type text-capitalize">
                          {val?.type}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </>
        )}
      </Row>
    </>
  );
};

export default RecentCard;
