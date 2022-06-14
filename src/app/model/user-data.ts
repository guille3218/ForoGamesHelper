/**
 * Interfaz usuario request
 */

export interface UserRequest {
  usuario: string;
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
}


/**
 * Interfaz usuario response
 */

export interface UserResponse {
  id: string,
  userName: string,
  password: string,
  email: string,
  nombre: string,
  apellidos: string,
  role: string,
  activo: boolean
}