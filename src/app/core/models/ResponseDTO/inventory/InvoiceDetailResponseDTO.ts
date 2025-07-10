export interface InvoiceDetailResponseDTO {
  id: number;
  category: number;
  description: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: boolean;
  creationDate: string;
  modificationDate: string;
}
