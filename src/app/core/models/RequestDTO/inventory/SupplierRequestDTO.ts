import { SupplierTypeResponseDTO } from "../../ResponseDTO/inventory/SupplierTypeResponseDTO";

export interface SupplierRequestDTO
{
    id?: number,
	businessName: string,
	address: string,
	phone: string,
	email: string,
	taxId: string,
  supplierType:SupplierTypeResponseDTO,
}
