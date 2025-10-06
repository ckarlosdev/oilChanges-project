export type Equipment = {
  equipmentsId: number;
  family: string;
  number: string;
  name: string;
  manufacturing: string;
  model: string;
  year: string;
  purchaseDate: string;
  status: string;
  condition: string;
  serialNumber: string;
  hour: number;
};

export type Maintenance = {
  maintenancesId: number;
  equipmentsId: number;
  maintenanceType: string;
  measureType: string;
  frecuency: number;
  description: string;
  createdBy: string;
  maintenanceHistoryDto: MaintenanceHistory | null;
};

export type MaintenanceHistory = {
  maintenancesHistoryId: number;
  maintenancesId: number;
  maintenanceDate: string;
  employee: string;
  odometer: string;
  comments: string;
  createdBy: string;
};
