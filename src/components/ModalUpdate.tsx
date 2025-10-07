import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import SelectionData from "./SelectionData";
import { ChangeEvent, useEffect, useState } from "react";
import { Maintenance } from "../types";
import { submitMaintenanceURL } from "../hooks/urls";

type Props = {
  showUpdate: boolean;
  handleCloseUpdate: () => void;
  postMaintenanceData: (url: string, payload: Maintenance) => Promise<any>;
  onMaintenanceSaved: () => void;
  equipmentId: number;
  equipmentName: string;
  equipmentNumber: string;
};

function ModalUpdate({
  showUpdate,
  handleCloseUpdate,
  postMaintenanceData,
  onMaintenanceSaved,
  equipmentId,
  equipmentName,
  equipmentNumber,
}: Props) {
  const [maintenance, setMaintenance] = useState<Maintenance>({
    maintenancesId: 0,
    equipmentsId: 0,
    maintenanceType: "Oil Change",
    measureType: "Hours",
    frecuency: 0,
    description: "",
    createdBy: "",
    maintenanceHistoryDto: null,
  });

  useEffect(() => {
    setMaintenance((prevMaintenance) => ({
      ...prevMaintenance!,
      equipmentsId: equipmentId,
    }));
  }, [equipmentId]);

  const handleSubmit = async () => {
    if (
      !maintenance?.measureType ||
      !maintenance.frecuency ||
      !maintenance.maintenanceType
    ) {
      alert("Plase, complete fields.");
      return;
    }

    try {
      const url = submitMaintenanceURL();
      await postMaintenanceData(url, maintenance);
      handleCloseUpdate();
      onMaintenanceSaved();
    } catch (error) {
      console.error("Erro saving data:", error);
      alert("An error occurred while saving the data.");
    }
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setMaintenance((prevMaintenance) => {
      let update = {
        ...prevMaintenance!,
        [name]: value,
      };

      return update;
    });
  };

  return (
    <>
      <Modal
        show={showUpdate}
        onHide={handleCloseUpdate}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Maintenance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div className="mb-3">
              <SelectionData
                equipmentName={equipmentName}
                equipmentNumber={equipmentNumber}
              />
            </div>
            <Row className="justify-content-center mb-3">
              <Col xs={12} md={12}>
                <Form.Select
                  aria-label="Select user"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                  name="createdBy"
                  value={maintenance?.createdBy}
                  onChange={handleChange}
                >
                  <option>Select user </option>
                  <option value="Donovan Curci" style={{ fontWeight: "bold" }}>
                    Donovan Curci
                  </option>
                  <option
                    value="Madeline Brandt"
                    style={{ fontWeight: "bold" }}
                  >
                    Madeline Brandt
                  </option>
                  <option
                    value="Thomas Gildemeister"
                    style={{ fontWeight: "bold" }}
                  >
                    Thomas Gildemeister
                  </option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="justify-content-center mb-3">
              <Col xs={12} md={12}>
                <Form.Select
                  aria-label="Select user"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                  name="maintenanceType"
                  value={maintenance?.maintenanceType}
                  onChange={handleChange}
                >
                  <option>Select maintenance type </option>
                  <option value="Oil Change" style={{ fontWeight: "bold" }}>
                    Oil Change
                  </option>
                  {/* <option value="Breakes" style={{ fontWeight: "bold" }}>
                    Breakes
                  </option>
                  <option value="Other" style={{ fontWeight: "bold" }}>
                    Other
                  </option> */}
                </Form.Select>
              </Col>
            </Row>
            <Row className="justify-content-center mb-3">
              <Col xs={12} md={12}>
                <Form.Select
                  aria-label="Select type measure"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                  name="measureType"
                  value={maintenance?.measureType}
                  onChange={handleChange}
                >
                  <option>Select measure type </option>
                  <option value="Miles" style={{ fontWeight: "bold" }}>
                    Miles
                  </option>
                  <option value="Hours" style={{ fontWeight: "bold" }}>
                    Hours
                  </option>
                  {/* <option value="Time" style={{ fontWeight: "bold" }}>
                    Time
                  </option> */}
                </Form.Select>
              </Col>
            </Row>
            <Row className="justify-content-center mb-3">
              <Col xs={12} md={12}>
                <Form.Control
                  type="text"
                  placeholder="Miles/Hours/Time"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                  name="frecuency"
                  value={maintenance?.frecuency}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={12} md="auto" className="text-center mb-2 mb-md-0">
                <Button
                  variant="secondary"
                  style={{
                    width: "130px",
                    height: "50px",
                    fontWeight: "bold",
                  }}
                  onClick={handleCloseUpdate}
                >
                  Close
                </Button>
              </Col>
              <Col xs={12} md="auto" className="text-center mb-2 mb-md-0">
                <Button
                  variant="primary"
                  style={{
                    width: "130px",
                    height: "50px",
                    fontWeight: "bold",
                  }}
                  onClick={handleSubmit}
                >
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdate;
