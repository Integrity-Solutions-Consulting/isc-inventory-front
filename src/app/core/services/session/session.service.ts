import { Injectable } from '@angular/core';
import { UserLoginResponseDTO } from '../../models/ResponseDTO/UserLoginResponseDTO';
import { MenuResponseDTO, RolesResponseDTO } from '../../../api';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}
  private readonly USER_KEY = 'user';
  private readonly TOKEN_KEY = 'token';

  /** Guarda el usuario y token en localStorage */
  startSession(user: UserLoginResponseDTO): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.TOKEN_KEY, user.token);
  }

  /** Retorna el usuario completo */
  getUserSession(): UserLoginResponseDTO | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  getUserNames(): string {
     const user = this.getUserSession();
     if(!user?.firstNames) return "";
     return user?.firstNames;
  }

  getUserMenus(): MenuResponseDTO[] {
  const user = this.getUserSession();
  if (!user?.menus) return [];

  // Convertir Set a Array y ordenar por `order`
  return Array.from(user.menus)
    .filter(menu => menu.active)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

  /** Retorna solo el token */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** Retorna los roles, si existen */
  getRoles(): string[] {
    const rolesSet = this.getUserSession()?.roles;
    if (!rolesSet) {
      return [];
    }
    const rolesArray = Array.from(rolesSet);
    return rolesArray.map((role) => role.name);
  }

  /** Limpia la sesión del usuario */
  endSession(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /** Verifica si el usuario está logueado */
  isAuthenticated(): boolean {
    return this.isTokenValid();
  }
  /** Decodifica el payload JWT */
  private parseJwt(token: string): any | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  /** Valida si el token está vigente */
  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = this.parseJwt(token);
    if (!payload || !payload.exp) return false;

    // 'exp' está en segundos, Date.now() en ms
    return payload.exp * 1000 > Date.now();
  }
}
