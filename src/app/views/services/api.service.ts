import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserRequest, UserResponse } from "../../model/user-data";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private readonly endpoint: string = 'http://localhost:8080'

  constructor(private readonly http: HttpClient) {

  }

  /**
   * registrarUsuario$
   * 
   */

  registrarUsuario$(usuario: UserRequest): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/register`, usuario);
  }

  /**
   * obtenerUsuarios$
   */

  obtenerUsuarios$(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.endpoint}/usuarios`);
  }

  /**
   * obtenerUsuarioLogin
   */

  obtenerUsuarioLogin(username: string, password: string): Observable<UserResponse> {
    const params = {
      username,
      password
    }

    return this.http.get<UserResponse>(`${this.endpoint}/login`, { params });
  }
}