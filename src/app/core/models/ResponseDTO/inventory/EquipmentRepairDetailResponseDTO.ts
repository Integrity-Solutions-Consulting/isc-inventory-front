import { EquipmentStatusResponseDTO } from "./EquipmentStatusResponseDTO";

export interface EquipmentRepairDetailResponseDTO {
  id: number;
  equipment: number;
  repairStatus: EquipmentStatusResponseDTO;
  serialNumber: string;
  repairDate: string; // O Date si lo vas a convertir
  description: string;
  cost: number;
  serviceProvider: string;
  status: boolean;
  creationDate: string; // O Date si lo manejas como objeto Date
  modificationDate: string; // O Date
}
