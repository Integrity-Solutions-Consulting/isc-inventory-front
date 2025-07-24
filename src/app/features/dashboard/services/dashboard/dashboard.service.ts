import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ResponseDTO } from '../../../../core/models/ResponseDTO/ResponseDTO';
import { DashboardResponseDTO } from '../../../../core/models/ResponseDTO/inventory/DashboardResponseDTO';
import { DashboardAcquisitionResponseDTO } from '../../../../core/models/ResponseDTO/inventory/DashboardAcquisitionResponseDTO';
import { DashboardEquipmentAssignedByCategoryResponseDTO } from '../../../../core/models/ResponseDTO/inventory/DashboardEquipmentAssignedByCategoryResponseDTO ';
import { DashboardEquipmentStatusSummaryResponseDTO } from '../../../../core/models/ResponseDTO/inventory/DashboardEquipmentStatusSummaryResponseDTO ';


@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = environment.apiBaseUrl;
  private apiUrl = `${this.baseUrl}/dashboard`;

  constructor(private httpClient: HttpClient) {}

  // Obtener cards sin parámetros
  public getAll(): Observable<ResponseDTO<DashboardResponseDTO>> {
    return this.httpClient.get<ResponseDTO<DashboardResponseDTO>>(`${this.apiUrl}/cards`);
  }

  // Obtener bar chart sin parámetros
  public getBar(): Observable<ResponseDTO<DashboardEquipmentAssignedByCategoryResponseDTO[]>> {
    return this.httpClient.get<ResponseDTO<DashboardEquipmentAssignedByCategoryResponseDTO[]>>(`${this.apiUrl}/barChart`);
  }

  // Obtener pie chart con parámetro category (categoryId)
  public getPie(categoryId: number): Observable<ResponseDTO<DashboardEquipmentStatusSummaryResponseDTO[]>> {
    const params = new HttpParams().set('category', categoryId.toString());
    return this.httpClient.get<ResponseDTO<DashboardEquipmentStatusSummaryResponseDTO[]>>(`${this.apiUrl}/pieChart`, { params });
  }

  // Obtener line chart con parámetro year
  public getLine(year: number): Observable<ResponseDTO<DashboardAcquisitionResponseDTO[]>> {
    const params = new HttpParams().set('year', year.toString());
    return this.httpClient.get<ResponseDTO<DashboardAcquisitionResponseDTO[]>>(`${this.apiUrl}/lineChart`, { params });
  }
}
