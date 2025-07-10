
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { MessageResponseDTO } from '../../../../api';
import { EquipmentRequestDTO } from '../../../../core/models/RequestDTO/inventory/EquipmentRequestDTO';
import { ResponseDTO } from '../../../../core/models/ResponseDTO/ResponseDTO';
import { EquipmentAssignmentDetailResponseDTO } from '../../../../core/models/ResponseDTO/inventory/EquipmentAssignmentDetailResponseDTO';
import { EquipmentAssignmentRequestDTO } from '../../../../core/models/RequestDTO/inventory/EquipmentAssignmentRequestDTO';
import { EquipmentRevokeRequestDTO } from '../../../../core/models/RequestDTO/inventory/EquipmentRevokeRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = environment.apiBaseUrl;
  private apiUrl = `${this.baseUrl}/invoice-detail`;

  constructor(private httpClient: HttpClient) { }

}
