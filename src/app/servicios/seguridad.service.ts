import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { UsuarioModel } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  urlBase: string = ConfiguracionRutasBackend.urlSeguridad;  
  constructor(
    private http: HttpClient
  ) { }

  IdentificarUsuario(usuario: string, clave: string): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(`${this.urlBase}identificar-usuario`, {
      correo: usuario, 
      clave: clave
    });
  }
}