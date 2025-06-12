import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../core/models/ResponseDTO/ResponseDTO';
import { UserResponseDTO } from '../../../core/models/ResponseDTO/UserResponseDTO';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiBaseUrl;
  private userGetUrl = `${this.baseUrl}/usuarios`;

  constructor(private httpClient: HttpClient) {}

    public getAll(): Observable<ResponseDTO<UserResponseDTO[]>> {
      return this.httpClient.get<ResponseDTO<UserResponseDTO[]>>(
        `${this.userGetUrl}`
      );
    }
}
