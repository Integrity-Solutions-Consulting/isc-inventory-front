export interface WarrantTypeRequestDTO {
  id?: number; // opcional, porque en la creación puede no existir
  id_equipment: number;
  conditions: string;
  warrantyStartDate: string; // formato ISO, ej: '2025-07-03T14:00:00'
  warrantyEndDate: string;
  supportContact: string;
  warrantyStatus: boolean;
}
