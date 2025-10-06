import { Badge, Form, ListGroup } from "react-bootstrap";
import { Equipment, Maintenance } from "../types";
import { useMemo } from "react";

type Props = {
  maintenanceDetail: Maintenance[] | undefined;
  equipments: Equipment[] | undefined;
  handleShow: (equipmentId: number) => void;
};

interface MaintenanceThreshold {
  odometer: number;
  frecuency: number;
}

function EquipmentList({ maintenanceDetail, handleShow, equipments }: Props) {
  const maintenanceThresholdMap = useMemo(() => {
    if (!maintenanceDetail) {
      console.log(
        "maintenanceDetail es undefined o null. Retornando Map vacío."
      );
      return new Map<number, MaintenanceThreshold>();
    }

    const map = new Map<number, MaintenanceThreshold>();

    if (maintenanceDetail.length > 1) {
      maintenanceDetail.forEach((maint) => {
        const lastOdometer = Number(maint.maintenanceHistoryDto?.odometer) || 0;

        map.set(maint.equipmentsId, {
          odometer: lastOdometer,
          frecuency: maint.frecuency,
        });
      });
    }

    return map;
  }, [maintenanceDetail]);

  return (
    <>
      <ListGroup>
        {equipments?.map((equipment) => {
          const threshold = maintenanceThresholdMap.get(equipment.equipmentsId);
          let badgeBg: "primary" | "secondary" | "danger" = "primary";

          if (!threshold) {
            badgeBg = "secondary";
          } else {
            const nextServiceDue = threshold.odometer + threshold.frecuency;

            if (equipment.hour > nextServiceDue || threshold.odometer == 0) {
              badgeBg = "danger";
            }
          }

          return (
            <ListGroup.Item
              action
              variant="primary"
              // Eliminamos d-flex justify-content-between para un mejor control de layout
              onClick={() => equipment && handleShow(equipment.equipmentsId)}
              key={equipment.equipmentsId}
            >
              {/* Contenedor Principal: Usamos Row y Col de Bootstrap internamente */}
              <div className="container-fluid p-0">
                {/* PRIMERA FILA: Nombre del Equipo y Badge (Lo más importante) */}
                <div className="row align-items-center mb-1">
                  {/* Nombre del Equipo: Ocupa la mayor parte del espacio, permitiendo el salto de línea */}
                  <div className="col-8 col-sm-9">
                    <div style={{ wordWrap: "break-word" }}>
                      {" "}
                      {/* Asegura que el texto largo se envuelva */}
                      <span
                        style={{ fontWeight: "bold", whiteSpace: "normal" }}
                      >
                        {equipment.number} -
                      </span>
                      <span style={{ whiteSpace: "normal" }}>
                        {equipment.name}
                      </span>
                    </div>
                  </div>

                  {/* Badge: Alineado a la derecha y fijo */}
                  <div className="col-4 col-sm-3 text-end">
                    <Badge
                      style={{
                        width: "100%",
                        maxWidth: "100px",
                        fontSize: "11px",
                      }}
                      bg={badgeBg}
                      pill
                    >
                      {badgeBg === "danger"
                        ? "Need service"
                        : badgeBg === "primary"
                        ? "No service"
                        : "No data"}
                    </Badge>
                  </div>
                </div>

                {/* SEGUNDA FILA: Odómetro (Dato secundario) */}
                <div className="row">
                  <div className="col-12 text-start text-sm-center">
                    {" "}
                    {/* Alineado a la izquierda en móvil, centrado en desktop */}
                    <Form.Label className="mb-0" style={{ fontSize: "0.9em" }}>
                      Odometer:
                      <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                        {equipment.hour}
                      </span>
                    </Form.Label>
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
}

export default EquipmentList;
