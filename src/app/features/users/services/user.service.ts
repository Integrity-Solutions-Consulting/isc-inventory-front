import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../core/models/ResponseDTO/ResponseDTO';
import { UserResponseDTO } from '../../../core/models/ResponseDTO/UserResponseDTO';
<<<<<<< HEAD

=======
import { UserRequestoDTO } from '../../../core/models/RequestDTO/UserRequestDTO';
import { MessageResponseDTO } from '../../../api';
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73

@Injectable({
  providedIn: 'root',
})
export class UserService {
<<<<<<< HEAD
  private baseUrl = environment.apiBaseUrl;
=======
  private baseUrl = environment.authBaseUrl;
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
  private userGetUrl = `${this.baseUrl}/usuarios`;

  constructor(private httpClient: HttpClient) {}

<<<<<<< HEAD
    public getAll(): Observable<ResponseDTO<UserResponseDTO[]>> {
      return this.httpClient.get<ResponseDTO<UserResponseDTO[]>>(
        `${this.userGetUrl}`
      );
    }
=======
  public getAll(): Observable<ResponseDTO<UserResponseDTO[]>> {
    return this.httpClient.get<ResponseDTO<UserResponseDTO[]>>(
      `${this.userGetUrl}`
    );
  }

  public update(
    user: UserRequestoDTO,
    id: number
  ): Observable<ResponseDTO<UserResponseDTO[]>> {
    return this.httpClient.put<ResponseDTO<UserResponseDTO[]>>(
      `${this.userGetUrl}/update/${id}`,
      user
    );
  }

  public delete(id: number): Observable<ResponseDTO<MessageResponseDTO[]>> {
    return this.httpClient.delete<ResponseDTO<MessageResponseDTO[]>>(
      `${this.userGetUrl}/delete/${id}`
    );
  }

  public active(id: number): Observable<ResponseDTO<MessageResponseDTO[]>> {
    return this.httpClient.put<ResponseDTO<MessageResponseDTO[]>>(
      `${this.userGetUrl}/activate/${id}`,null
    );
  }

  public suspend(id: number): Observable<ResponseDTO<MessageResponseDTO[]>> {
    return this.httpClient.put<ResponseDTO<MessageResponseDTO[]>>(
      `${this.userGetUrl}/suspend/${id}`,null
    );
  }

  public unsuspend(id: number): Observable<ResponseDTO<MessageResponseDTO[]>> {
    return this.httpClient.put<ResponseDTO<MessageResponseDTO[]>>(
      `${this.userGetUrl}/unsuspend/${id}`,null
    );
  }
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
}
