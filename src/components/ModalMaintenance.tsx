import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import SelectionData from "./SelectionData";
import { ChangeEvent, useEffect, useState } from "react";
import { MaintenanceHistory } from "../types";
import { submitMaintenanceHistoryURL } from "../hooks/urls";

type Props = {
  showMaintenance: boolean;
  handleCloseMaintenance: () => void;
  maintenanceId: number;
  postMaintenanceData: (
    url: string,
    payload: MaintenanceHistory
  ) => Promise<any>;
  onMaintenanceSaved: () => void;
};

const getFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

function ModalMaintenance({
  showMaintenance,
  handleCloseMaintenance,
  maintenanceId,
  postMaintenanceData,
  onMaintenanceSaved,
}: Props) {
  const today = getFormattedDate(new Date());
  // const [selectedDate, setSelectedDate] = useState(today);
  const [maintenance, setMaintenance] = useState<
    MaintenanceHistory | undefined
  >({
    maintenancesHistoryId: 0,
    maintenancesId: maintenanceId,
    maintenanceDate: today,
    employee: "",
    odometer: "",
    comments: "",
    createdBy: "",
  });

  useEffect(() => {
    setMaintenance((prevMaintenance) => ({
      ...prevMaintenance!,
      maintenancesId: maintenanceId,
    }));
  }, [maintenanceId]);

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

      if (name === "employee") {
        update = {
          ...update,
          createdBy: value,
        };
      }

      return update;
    });
  };

  const handleSubmit = async () => {
    if (
      !maintenance?.employee ||
      !maintenance.odometer ||
      !maintenance.maintenanceDate
    ) {
      alert("Plase, complete User, Date and odometer fields.");
      return;
    }

    try {
      const url = submitMaintenanceHistoryURL();
      await postMaintenanceData(url, maintenance);
      handleCloseMaintenance();
      onMaintenanceSaved();
    } catch (error) {
      console.error("Erro saving data:", error);
      alert("An error occurred while saving the data.");
    }
  };

  return (
    <>
      <Modal
        show={showMaintenance}
        onHide={handleCloseMaintenance}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Oil Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div className="mb-3">
              <SelectionData />
            </div>

            <Row className="justify-content-center mb-3">
              <Col xs={12} md={12}>
                <Form.Select
                  aria-label="Select user"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                  name="employee"
                  value={maintenance?.employee}
                  onChange={handleChange}
                >
                  <option>Select user </option>
                  <option value="Donovan Curci" style={{ fontWeight: "bold" }}>
                    Donovan Curci
                  </option>
                  <option value="Madeline Brandt" style={{ fontWeight: "bold" }}>
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
                <Form.Control
                  style={{ fontWeight: "bold", textAlign: "center" }}
                  type="date"
                  name="maintenanceDate"
                  value={maintenance?.maintenanceDate}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="justify-content-center mb-3">
              <Col xs={12} md={12}>
                <Form.Control
                  type="text"
                  placeholder="Miles/Hours/Time"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                  name="odometer"
                  value={maintenance?.odometer}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="justify-content-center mb-3">
              <Col xs={12} md={12}>
                <FloatingLabel controlId="floatingTextarea2" label="Comments">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    name="comments"
                    value={maintenance?.comments}
                    onChange={handleChange}
                  />
                </FloatingLabel>
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
                  onClick={handleCloseMaintenance}
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

export default ModalMaintenance;
