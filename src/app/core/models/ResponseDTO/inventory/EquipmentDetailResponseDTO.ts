import { EquipmentCharacteristicResponseDTO } from "./EquipmentCharacteristicResponseDTO";

export interface EquipmentDetailResponseDTO {
  id: number;
  invoice: number | null;

  equipmentStatusId: number;
  equipmentStatusName: string;

  categoryId: number;
  categoryName: string;
  categoryStock: number;

  companyId: number;
  companyName: string;

  characteristics: EquipmentCharacteristicResponseDTO[];

  brand: string;
  model: string;
  serialNumber: string;
  itemCode: string;

  status: boolean;
  creationDate: string; // ISO format from backend
  modificationDate: string;
}
