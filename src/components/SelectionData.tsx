import { Col, Form, Row } from "react-bootstrap";

type Props = {
  equipmentNumber: string;
  equipmentName: string;
};

function SelectionData({ equipmentNumber, equipmentName}: Props) {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md="auto" className="text-center mb-2 mb-md-0">
          <Form.Label style={{ fontWeight: "bold", fontSize:"25px" }}>{equipmentNumber}</Form.Label>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto" className="text-center mb-2 mb-md-0">
          <Form.Label style={{ fontWeight: "bold", fontSize:"25px" }}>{equipmentName}</Form.Label>
        </Col>
      </Row>
    </>
  );
}

export default SelectionData;
