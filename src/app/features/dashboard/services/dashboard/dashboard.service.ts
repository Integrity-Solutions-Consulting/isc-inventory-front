import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ResponseDTO } from '../../../../core/models/ResponseDTO/ResponseDTO';
import { EquipmentResponseDTO } from '../../../../core/models/ResponseDTO/inventory/EquipmentResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = environment.apiBaseUrl;
  private apiUrl = `${this.baseUrl}/dashboard`;
  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<ResponseDTO<any[]>> {
    return this.httpClient.get<ResponseDTO<any[]>>(
      `${this.apiUrl}/cards`
    );
  }
}
