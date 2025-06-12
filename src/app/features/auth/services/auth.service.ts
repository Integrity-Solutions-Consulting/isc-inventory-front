import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {
  LoginRequestDTO,
  MessageResponseDTO,
  PasswordChangeRequestDTO,
  TokenResponseDTO,
} from '../../../api';
import { HttpClient } from '@angular/common/http';
import { UserLoginResponseDTO } from '../../../core/models/ResponseDTO/UserLoginResponseDTO';
import { ResponseDTO } from '../../../core/models/ResponseDTO/ResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;

  private loginUrl = `${this.baseUrl}/auth/login`;
  private registerUrl = `${this.baseUrl}/auth/register`;
  private logoutUrl = `${this.baseUrl}/auth/logout`;
  private forgotPasswordUrl = `${this.baseUrl}/auth/forgotPassword`;

  constructor(private httpClient: HttpClient) {}

  public login(
    loginRequest: LoginRequestDTO
  ): Observable<ResponseDTO<UserLoginResponseDTO>> {
    return this.httpClient.post<ResponseDTO<UserLoginResponseDTO>>(
      this.loginUrl,
      loginRequest
    );
  }

  public generateTokenForgotPassword(
    email: string
  ): Observable<ResponseDTO<TokenResponseDTO>> {
    return this.httpClient.get<ResponseDTO<TokenResponseDTO>>(
      `${this.forgotPasswordUrl}/request/${email}`
    );
  }

  public validateTokenForgotPassword(
    token: string
  ): Observable<ResponseDTO<MessageResponseDTO>> {
    return this.httpClient.get<ResponseDTO<MessageResponseDTO>>(
      `${this.forgotPasswordUrl}/validateToken/${token}`
    );
  }

  public restorePassword(
    token: string,
    passwordRequest: PasswordChangeRequestDTO
  ): Observable<ResponseDTO<boolean>> {
    return this.httpClient.post<ResponseDTO<boolean>>(
      `${this.forgotPasswordUrl}/restorePassword/${token}`,
      passwordRequest
    );
  }

  public logout(): Observable<ResponseDTO<string>> {
    return this.httpClient.post<ResponseDTO<string>>(
      `${this.logoutUrl}`,
      null
    );
  }
}
