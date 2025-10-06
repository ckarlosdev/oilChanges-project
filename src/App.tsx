import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import "./App.css";
import Title from "./components/Title";
import EquipmentList from "./components/EquipmentList";
import { useEffect, useState } from "react";
import ModalOptions from "./components/ModalOptions";
import ModalMaintenance from "./components/ModalMaintenance";
import SelectionData from "./components/SelectionData";
import ModalUpdate from "./components/ModalUpdate";
import { Equipment, Maintenance } from "./types";
import useHttpsData from "./hooks/useHttpsData";
import { searchEquipmentsURL, searchMaintenancesURL } from "./hooks/urls";

function App() {
  const [equipmentSelected, setEquipmentSelected] = useState<Equipment>();
  const [maintenanceSelected, setMaintenanceSelected] =
    useState<Maintenance | null>();
  const [maintenanceCreated, setMaintenanceCreated] = useState<boolean>(false);
  const [equipmentsDetail, setEquipmentsDetail] = useState<
    Equipment[] | undefined
  >();
  const [maintenanceDetail, setMaintenanceDetail] = useState<Maintenance[]>([]);

  const { data: equipmentData, search: searchEquipment } =
    useHttpsData<Equipment[]>();

  const {
    data: maintenanceData,
    search: searchMaintenance,
    postData: submitMaintenanceHistory,
    postData: submitMaintenance,
  } = useHttpsData<Maintenance[]>();

  const [show, setShow] = useState(false);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (equipmentsId: number) => {
    setShow(true);
    const equipment = equipmentsDetail?.find(
      (equipment) => equipment.equipmentsId === equipmentsId
    );

    const existMaintenace = maintenanceDetail?.find(
      (maintenance) => maintenance.equipmentsId === equipmentsId
    );

    if (equipment) {
      setEquipmentSelected(equipment);
    }

    if (existMaintenace) {
      console.log("pasa 1");
      setMaintenanceCreated(true);
      setMaintenanceSelected(existMaintenace);
    } else {
      console.log("pasa 2");
      setMaintenanceCreated(false);
      setMaintenanceSelected(null);
    }
  };

  const handleCloseMaintenance = () => setShowMaintenance(false);
  const handleShowMaintenance = () => setShowMaintenance(true);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  useEffect(() => {
    const url = searchEquipmentsURL();
    searchEquipment(url);

    const urlMaintenance = searchMaintenancesURL();
    searchMaintenance(urlMaintenance);
  }, []);

  useEffect(() => {
    if (equipmentData) {
      setEquipmentsDetail(equipmentData);
    }
    if (maintenanceData) {
      setMaintenanceDetail(maintenanceData);
    }
  }, [equipmentData, maintenanceData]);

  const handleRefreshData = () => {
    const url = searchEquipmentsURL();
    searchEquipment(url);

    const urlMaintenance = searchMaintenancesURL();
    searchMaintenance(urlMaintenance);
  };

  // console.log(maintenanceSelected);

  return (
    <>
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="7">
              <Title />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs lg="7">
              <Card>
                <Card.Body
                  style={{
                    maxHeight: "63vh", // Limita la altura al 70% de la altura de la ventana (viewport height)
                    overflowY: "auto", // Habilita el desplazamiento vertical si excede la altura
                  }}
                >
                  <EquipmentList
                    maintenanceDetail={maintenanceDetail}
                    equipments={equipmentsDetail}
                    handleShow={handleShow}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center mb-3">
            <Col xs={12} md="auto" className="text-center">
              <Button
                variant="primary"
                style={{ margin: "20px", fontSize: "20px", fontWeight: "bold" }}
              >
                Back
              </Button>
            </Col>
          </Row>
        </Container>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Select an option</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="mb-3">
                <Col>
                  <Card>
                    <SelectionData />
                  </Card>
                </Col>
              </Row>
              <Card>
                <Row className="justify-content-md-center">
                  <Col md="auto">
                    <span style={{ fontSize: "20px" }}>Odometer:</span>{" "}
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      {equipmentSelected?.hour}
                    </span>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  <Col md="auto">
                    <span style={{ fontSize: "20px" }}>Frequency:</span>{" "}
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      {maintenanceCreated
                        ? maintenanceSelected?.frecuency
                        : "No data"}
                    </span>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  <Col md="auto">
                    <span style={{ fontSize: "20px" }}>Last maintenance:</span>{" "}
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      {maintenanceCreated
                        ? maintenanceSelected?.maintenanceHistoryDto
                          ? maintenanceSelected?.maintenanceHistoryDto.odometer
                          : "No register"
                        : "No data"}
                    </span>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  <Col md="auto">
                    <span style={{ fontSize: "20px" }}>Date: </span>{" "}
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      {maintenanceCreated
                        ? maintenanceSelected?.maintenanceHistoryDto
                          ? maintenanceSelected?.maintenanceHistoryDto
                              .maintenanceDate
                          : "No register"
                        : "No data"}
                    </span>
                  </Col>
                </Row>
              </Card>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <ModalOptions
              maintenanceCreated={maintenanceCreated}
              onClickMaintenance={() => {
                handleClose(), handleShowMaintenance();
              }}
              onClickUpdate={() => {
                handleClose(), handleShowUpdate();
              }}
            />
          </Modal.Footer>
        </Modal>

        <ModalMaintenance
          maintenanceId={maintenanceSelected?.maintenancesId ?? 0}
          showMaintenance={showMaintenance}
          handleCloseMaintenance={handleCloseMaintenance}
          postMaintenanceData={submitMaintenanceHistory}
          onMaintenanceSaved={handleRefreshData}
        />

        <ModalUpdate
          equipmentId={equipmentSelected?.equipmentsId ?? 0}
          onMaintenanceSaved={handleRefreshData}
          postMaintenanceData={submitMaintenance}
          showUpdate={showUpdate}
          handleCloseUpdate={handleCloseUpdate}
        />
      </div>
    </>
  );
}

export default App;
