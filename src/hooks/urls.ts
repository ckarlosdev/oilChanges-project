const base = "https://checklist-api-8j62.onrender.com/api/v1";

export const submitEquipmentURL = () => `${base}/equipments`;

export const searchEquipmentsURL = () => `${base}/equipments`;
export const searchMaintenancesURL = () => `${base}/maintenances`;
export const submitMaintenanceHistoryURL = () => `${base}/maintenanceHistory`;
export const submitMaintenanceURL = () => `${base}/maintenance`;
export const getMaintenancesHistoryByIdURL = (maintenancesId: number) =>
  `${base}/maintenancesHistory/${maintenancesId}`;
