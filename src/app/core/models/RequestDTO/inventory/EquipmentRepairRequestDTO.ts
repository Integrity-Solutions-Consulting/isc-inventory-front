import { SupplierTypeResponseDTO } from "../../ResponseDTO/inventory/SupplierTypeResponseDTO";

export interface EquipmentRepairRequestDTO {
    equipment:number;
    description:string;
    cost:number;
    revoke:boolean;
    serviceProvider: number;

}
