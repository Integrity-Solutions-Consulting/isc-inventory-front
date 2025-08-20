import { EquipmentStatusResponseDTO } from "./EquipmentStatusResponseDTO";
import { SupplierResponseDTO } from "./SupplierResponseDTO";

export interface EquipmentRepairDetailResponseDTO
{
  id: number;
  equipment: number;
  repairStatus: EquipmentStatusResponseDTO;
  equipmentStatus: EquipmentStatusResponseDTO;
  serialNumber: string;
  brand:string;
  model:string;
  categoryName:string;
  repairDate: string;
  description: string;
  cost: number;
  serviceProvider:SupplierResponseDTO,
  status: boolean;
  creationDate: string;
  modificationDate: string;
}
