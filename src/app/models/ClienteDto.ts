export interface ClienteRequest {
  id: string;
  apellidos: string;
  nombre: string;
  email: string;
  tipoPersona: string;
  tipoDocumento?: string;
  rol?: string;
  keycloakId?: string;
}

export interface ClienteResponse {
  id: string;
  apellidos: string;
  nombre: string;
  email: string;
  tipoPersona: string;
  tipoDocumento?: string;
  rol?: string;
  keycloakId?: string;
  dateCreated?: string;
  dateUpdated?: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

export interface OperationResult<T> {
  isSuccess: boolean;
  data?: T;
  errorCode?: string;
  errorMessage?: string;
}
