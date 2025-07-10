export interface WarrantTypeDetailResponseDTO {
  id: number;
  id_equipment: number;
  SerialNumber: string;
  conditions: string;
  warrantyStartDate: Date | string; // Puede ser Date o string dependiendo de cómo manejes las fechas
  warrantyEndDate: Date | string;
  SupportContact: string;
  warrantyStatus: boolean;
  status: boolean;
}
