import { Col, Form, Row } from "react-bootstrap";

type Props = {};

function SelectionData({}: Props) {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Form.Label style={{ fontWeight: "bold", fontSize:"25px" }}>E10</Form.Label>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Form.Label style={{ fontWeight: "bold", fontSize:"25px" }}>Dingo</Form.Label>
        </Col>
      </Row>
    </>
  );
}

export default SelectionData;
