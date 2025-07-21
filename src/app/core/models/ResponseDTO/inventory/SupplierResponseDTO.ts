import{SupplierTypeResponseDTO}from'../inventory/SupplierTypeResponseDTO'

export interface SupplierResponseDTO {
    id: number,
	businessName: string,
	address: string,
	phone: string,
	email: string,
	taxId: string,
  supplierType:SupplierTypeResponseDTO,

}
