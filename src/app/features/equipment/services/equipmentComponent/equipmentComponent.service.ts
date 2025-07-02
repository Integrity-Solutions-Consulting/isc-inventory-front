import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../../core/models/ResponseDTO/ResponseDTO';
import { ComponentTypeResponseDTO } from '../../../../core/models/ResponseDTO/inventory/ComponentTypeResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class EquipmentComponentService {
  private baseUrl = environment.apiBaseUrl;
  private apiUrl = `${this.baseUrl}/component-types`;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<ResponseDTO<ComponentTypeResponseDTO[]>> {
    return this.httpClient.get<ResponseDTO<ComponentTypeResponseDTO[]>>(
      `${this.apiUrl}/list`
    );
  }

}
