import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseDTO } from "../../../../core/models/ResponseDTO/ResponseDTO";
import { EquipmentDismissalResponseDTO } from "../../../../core/models/ResponseDTO/inventory/EquipmentDismissalResponseDTO";
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EquipmentDismissalService {
  private baseUrl = environment.apiBaseUrl;
  private apiUrl =  `${this.baseUrl}/equipment-dismissal`;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<ResponseDTO<EquipmentDismissalResponseDTO[]>> {
    return this.httpClient.get<ResponseDTO<EquipmentDismissalResponseDTO[]>>(
      `${this.apiUrl}`
    );
  }

  public getTable(): Observable<ResponseDTO<EquipmentDismissalResponseDTO[]>> {
      return this.httpClient.get<ResponseDTO<EquipmentDismissalResponseDTO[]>>(
        `${this.apiUrl}`
      );
    }
}
