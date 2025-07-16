import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ResponseDTO } from '../../../../core/models/ResponseDTO/ResponseDTO';
import { EquipmentAssignmentDetailResponseDTO } from '../../../../core/models/ResponseDTO/inventory/EquipmentAssignmentDetailResponseDTO';
import { EquipmentAssignmentRequestDTO } from '../../../../core/models/RequestDTO/inventory/EquipmentAssignmentRequestDTO';
import { EquipmentRevokeRequestDTO } from '../../../../core/models/RequestDTO/inventory/EquipmentRevokeRequestDTO';
import { MessageResponseDTO } from '../../../../core/models/ResponseDTO/MessageResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class AssaingmentService {
  private baseUrl = environment.apiBaseUrl;
  private apiUrl = `${this.baseUrl}/equipment-assignment`;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<
    ResponseDTO<EquipmentAssignmentDetailResponseDTO[]>
  > {
    return this.httpClient.get<
      ResponseDTO<EquipmentAssignmentDetailResponseDTO[]>
    >(`${this.apiUrl}/details`);
  }

  public save(
    entity: EquipmentAssignmentRequestDTO
  ): Observable<ResponseDTO<EquipmentAssignmentDetailResponseDTO>> {
    return this.httpClient.post<
      ResponseDTO<EquipmentAssignmentDetailResponseDTO>
    >(`${this.apiUrl}/assign`, entity);
  }

  public revoke(id: number,revokeDate: EquipmentRevokeRequestDTO): Observable<ResponseDTO<EquipmentAssignmentDetailResponseDTO>> {
    return this.httpClient.put<ResponseDTO<EquipmentAssignmentDetailResponseDTO>>(
      `${this.apiUrl}/revoke/${id}`,
      revokeDate
    );
  }

  public delete(id: number): Observable<ResponseDTO<MessageResponseDTO[]>> {
    return this.httpClient.delete<ResponseDTO<MessageResponseDTO[]>>(
      `${this.apiUrl}/inactive/${id}`
    );
  }

  public active(id: number): Observable<ResponseDTO<MessageResponseDTO[]>> {
    return this.httpClient.patch<ResponseDTO<MessageResponseDTO[]>>(
      `${this.apiUrl}/activate/${id}`,
      null
    );
  }
}
