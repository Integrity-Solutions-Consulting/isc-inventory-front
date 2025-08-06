export interface EquipmentDismissalResponseDTO
{
  id: number;
  equipmentId: number;
  equipmentBrand: string;
  equipmentModel: string;
  equipmentSerialNumber: string;
  equipmentItemCode: string;
  dismissalTypeId: number;
  dismissalTypeName: string;
  status: boolean;
  creationDate: string;
  modificationDate: string;
}


