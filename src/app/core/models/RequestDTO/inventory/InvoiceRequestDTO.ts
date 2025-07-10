import { InvoiceDetailRequestDTO } from "./InvoiceDetailRequestDTO";

export interface InvoiceRequestDTO{
    id:number;
    invoiceDetails: InvoiceDetailRequestDTO;
    invoiceDate: string;
    

} 