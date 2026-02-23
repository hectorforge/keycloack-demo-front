import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ClienteRequest, ClienteResponse, OperationResult} from '../models/ClienteDto';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  private readonly API_URL = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  /**
   * Sincroniza el usuario autenticado con el backend.
   * Devuelve ClienteResponse con info local (nuevo o existente)
   * @param token JWT de Keycloak
   */
  syncUsuario(token: string): Observable<OperationResult<ClienteResponse>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<OperationResult<ClienteResponse>>(
      `${this.API_URL}/sync`,
      {}, // body vacío, backend extrae info del JWT
      { headers }
    );
  }

  /**
   * Obtiene info local del cliente actual sin sincronizar
   * @param token JWT de Keycloak
   */
  getMe(token: string): Observable<OperationResult<ClienteResponse>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<OperationResult<ClienteResponse>>(
      `${this.API_URL}/me`,
      { headers }
    );
  }

  /**
   * Actualiza datos del cliente
   * @param id Id del cliente
   * @param cliente ClienteRequest con campos a actualizar
   * @param token JWT de Keycloak
   */
  actualizarCliente(id: string, cliente: ClienteRequest, token: string): Observable<OperationResult<ClienteResponse>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.put<OperationResult<ClienteResponse>>(
      `${this.API_URL}/${id}`,
      cliente,
      { headers }
    );
  }

  /**
   * Lista clientes con filtros y paginación
   */
  listarClientes(
    token: string,
    filtros: { apellidos?: string; nombre?: string; email?: string; tipoPersona?: string } = {},
    page = 0,
    size = 10
  ): Observable<OperationResult<{ items: ClienteResponse[], totalElements: number }>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    const params: any = { ...filtros, page, size };

    return this.http.get<OperationResult<{ items: ClienteResponse[], totalElements: number }>>(
      `${this.API_URL}`,
      { headers, params }
    );
  }
}
