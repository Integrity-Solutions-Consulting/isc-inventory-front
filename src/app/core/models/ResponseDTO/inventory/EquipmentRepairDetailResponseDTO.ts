import { EquipmentResponseDTO } from "./EquipmentResponseDTO";
import { EquipmentStatusResponseDTO } from "./EquipmentStatusResponseDTO";

export interface EquipmentRepairDetailResponseDTO
{
  id: number;
  equipment: number;
  repairStatus: EquipmentStatusResponseDTO;
  serialNumber: string;
  brand:string;
  model:string;
  categoryName:string;
  repairDate: string;
  description: string;
  cost: number;
  serviceProvider: string;
  status: boolean;
  creationDate: string;
  modificationDate: string;
}
