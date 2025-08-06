import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseDTO } from "../../../../core/models/ResponseDTO/ResponseDTO";
import { EquipmentDismissalResponseDTO } from "../../../../core/models/ResponseDTO/inventory/EquipmentDismissalResponseDTO";

@Injectable({
  providedIn: 'root'
})
export class EquipmentDismissalService {
  private apiUrl = 'http://localhost:8080/api/v1/equipment-dismissal'; // Ajusta el endpoint base si es distinto

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<ResponseDTO<EquipmentDismissalResponseDTO[]>> {
    return this.httpClient.get<ResponseDTO<EquipmentDismissalResponseDTO[]>>(
      `${this.apiUrl}`
    );
  }
}
