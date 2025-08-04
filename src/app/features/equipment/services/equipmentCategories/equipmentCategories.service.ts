import { Injectable } from '@angular/core';
import { EquipmentCharacteristicResponseDTO } from '../../../../core/models/ResponseDTO/inventory/EquipmentCharacteristicResponseDTO';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ResponseDTO } from '../../../../core/models/ResponseDTO/ResponseDTO';
import { EquipmentCategoryResponseDTO } from '../../../../core/models/ResponseDTO/inventory/EquipmentCategoryResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class EquipmentCategoriesService {
 private baseUrl = environment.apiBaseUrl;
  private apiUrl = `${this.baseUrl}/equipment-categories`;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<ResponseDTO<EquipmentCategoryResponseDTO[]>> {
    return this.httpClient.get<ResponseDTO<EquipmentCategoryResponseDTO[]>>(
      `${this.apiUrl}/simple`
    );
  }

}
