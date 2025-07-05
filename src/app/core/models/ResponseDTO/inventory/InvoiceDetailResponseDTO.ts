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
  creationDate: string; // ← revisa este nombre, podría ser un error tipográfico
  modificationDate: string;
}
