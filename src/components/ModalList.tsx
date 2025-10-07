import {
  Badge,
  Button,
  Col,
  Container,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import SelectionData from "./SelectionData";
import { Equipment, MaintenanceHistory } from "../types";
import { useEffect, useState } from "react";
import useHttpsData from "../hooks/useHttpsData";
import { getMaintenancesHistoryByIdURL } from "../hooks/urls";

type Props = {
  showList: boolean;
  handleCloseList: () => void;
  maintenanceId: number;
  equipmentSelected?: Equipment;
};

function ModalList({
  showList,
  handleCloseList,
  maintenanceId,
  equipmentSelected,
}: Props) {
  const [maintenanceHistoryDetail, setMaintenanceHistoryDetail] = useState<
    MaintenanceHistory[]
  >([]);

  const { data: maintenanceHistoryData, search: searchMaintenanceHistory } =
    useHttpsData<MaintenanceHistory[]>();

  useEffect(() => {
    const url = getMaintenancesHistoryByIdURL(maintenanceId);
    searchMaintenanceHistory(url);
  }, [maintenanceId]);

  useEffect(() => {
    if (maintenanceHistoryData) {
      setMaintenanceHistoryDetail(maintenanceHistoryData);
    }
  }, [maintenanceHistoryData]);

  return (
    <>
      <Modal
        show={showList}
        onHide={handleCloseList}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Oil changes records </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div className="mb-3">
              <SelectionData
                equipmentName={equipmentSelected?.name ?? ""}
                equipmentNumber={equipmentSelected?.number ?? ""}
              />
            </div>
            <Row className="justify-content-center mb-3">
              <Col xs={12} md={12}>
                <ListGroup as="ol" numbered>
                  {maintenanceHistoryDetail.map((maintenance) => (
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{maintenance.employee}</div>
                        {"Odometer: "}
                        {maintenance.odometer}
                      </div>
                      <Badge bg="primary" pill>
                        {maintenance.maintenanceDate}
                      </Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseList}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalList;
