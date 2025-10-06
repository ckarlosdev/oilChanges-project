import { Button, Col, Container, Row } from "react-bootstrap";

type Props = {
  onClickMaintenance: () => void;
  onClickUpdate: () => void;
  maintenanceCreated: boolean;
};

function ModalOptions({
  onClickMaintenance,
  onClickUpdate,
  maintenanceCreated,
}: Props) {
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md="auto" className="text-center mb-2 mb-md-0">
            <Button
              style={{
                width: "130px",
                height: "50px",
                fontWeight: "bold",
              }}
              variant="primary"
              onClick={onClickUpdate}
            >
              Update
            </Button>
          </Col>
          {/* <Col xs={12} md="auto" className="text-center mb-2 mb-md-0">
            <Button
              style={{
                width: "130px",
                height: "50px",
                fontWeight: "bold",
              }}
              onClick={onClick}
              variant="primary"
            >
              Issues
            </Button>
          </Col> */}
          <Col xs={12} md="auto" className="text-center mb-2 mb-md-0">
            <Button
              disabled={!maintenanceCreated}
              style={{
                width: "130px",
                height: "50px",
                fontWeight: "bold",
              }}
              onClick={onClickMaintenance}
              variant="primary"
            >
              Maintenance
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ModalOptions;
