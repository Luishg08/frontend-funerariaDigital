import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { UsuarioModel } from '../modelos/usuario.model';
import { UsuarioValidadoModel } from '../modelos/usuario.validado.model';
import { UsuarioCambioClaveModel } from '../modelos/usuario.cambio.clave.model';
import { UsuarioPqrsModel } from '../modelos/usuario.pqrs.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  urlBase: string = ConfiguracionRutasBackend.urlSeguridad;  
  constructor(
    private http: HttpClient
  ) { 
    this.validacionDeSesion();
  }

  /**
   * Identificar usuario
   * @param usuario 
   * @param clave 
   * @returns datos del usuario valido
   */
  IdentificarUsuario(usuario: string, clave: string): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(`${this.urlBase}identificar-usuario`, {
      correo: usuario, 
      clave: clave
    });
  }

  AlmacenarDatosUsuarioIdentificado(datos:UsuarioModel): boolean{
    let cadena = JSON.stringify(datos);
    let datosLS= localStorage.getItem('datos-usuario');
    if(datosLS){
      localStorage.removeItem('datos-usuario');
    }
    localStorage.setItem('datos-usuario',cadena);

    return true;
  }

  
  /**
   * Cerrando Sesion
   */
  RemoverDatosUsuarioValidado(){
    let datosUsuario= localStorage.getItem("datos-usuario")
    let datosSesion= localStorage.getItem("datos-sesion")
    if(datosUsuario){
      localStorage.removeItem("datos-usuario")
    }
    if(datosSesion){
      localStorage.removeItem("datos-sesion")
    }
    this.ActualizarComportamientoUsuario(new UsuarioValidadoModel());
  }


    ObtenerDatosUsuarioLS():UsuarioModel | null{
      let datosLS= localStorage.getItem('datos-usuario');
      if(datosLS){
        let datos= JSON.parse(datosLS);
        return datos
      }else{
        return null
      }
    }
    

    /**
     * Validar codigo 2fa
     * @param idUsuario 
     * @param codigo2fa 
     * @returns 
     */    
    ValidarCodigo2fa(idUsuario: string, codigo2fa: string): Observable<UsuarioValidadoModel>{
      return this.http.post<UsuarioValidadoModel>(`${this.urlBase}verificar-2fa`, {
        usuarioId: idUsuario,
        codigo2fa: codigo2fa
      });
    }


    /**
     * Guarda en el LS la informacion del usuario validado
     * @param datos Datos de usuario validado
     * @returns respuesa 
     */
    AlmacenarDatosUsuarioValidado(datos:UsuarioValidadoModel): boolean{
      let datosLS= localStorage.getItem('datos-sesion');
      if(datosLS){
        localStorage.removeItem("datos-sesion");
      }
      let datosString= JSON.stringify(datos);      
      localStorage.setItem("datos-sesion", datosString)
      this.ActualizarComportamientoUsuario(datos)
      return true;
    }


    RecuperarClavePorUsuario(usuario: string): Observable<UsuarioModel>{
      return this.http.post<UsuarioModel>(`${this.urlBase}recuperar-clave`, {
        correo: usuario
      });
    }

    /**
     * Administracion de ls sesion de usuario
     */
    
    datosUsuarioValidado= new BehaviorSubject<UsuarioValidadoModel>(new UsuarioValidadoModel())

    ObtenerDatosSesion():Observable <UsuarioValidadoModel>{
      return this.datosUsuarioValidado.asObservable();
    }

    validacionDeSesion(){
      let ls =localStorage.getItem("datos-sesion")
      if(ls){
        let objUsuario= JSON.parse(ls);
        this.ActualizarComportamientoUsuario(objUsuario)
      }
    }

    ActualizarComportamientoUsuario(datos:UsuarioValidadoModel){
      return this.datosUsuarioValidado.next(datos);
    }

    /**
     * Obtener el usuario y clave del local storage
     */
    ObtenerDatosUsuarioClaveLS():UsuarioModel | null{
      let datosLS= localStorage.getItem('datos-usuario');
      if(datosLS){
        let datos= JSON.parse(datosLS);
        this.VerificarClaveActual(datos.clave);
        this.CompararClaves(datos.claveNueva, datos.confirmacionClave);
        return datos
      }else{
        return null
      }
    }
  
    /**
     * Verifica que la clave no sea invalida
     * @param clave clave del usuario
     * @returns si la clave es valida
     */
    VerificarClaveActual(clave:string):boolean{
      if(clave === ''){
        return false
      }else{
        return true
      }
    }

    /**
     * Comparar clave nueva sea igual que la clave de confirmacion
     */
    CompararClaves(claveNueva:string, confirmacionClave:string):boolean{
      if(claveNueva === confirmacionClave){
        return true
      }else{
        return false
      }
    }
    /**
     * Cambiar clave
     * @param idUsuario 
     * @param claveNueva 
     * @returns 
     */
    CambiarClave(idUsuario: string, claveNueva: string): Observable<UsuarioCambioClaveModel>{
      return this.http.post<UsuarioCambioClaveModel>(`${this.urlBase}cambiar-clave`, {
        usuarioId: idUsuario,
        clave: claveNueva
    });
    }

    enviarMensajePqrs(correo:string, nombre:string, tipo:string, mensaje:string): Observable<UsuarioPqrsModel>{
      return this.http.post<UsuarioPqrsModel>(`${this.urlBase}enviar-PQRS`, {
        correoPersona: correo,
        nombrePersona: nombre,
        tipoMensaje: tipo,
        contenido: mensaje
      });
    }
    
    RegistrarUsuarioPublico(datos:any): Observable<UsuarioModel>{
      return this.http.post<UsuarioModel>(`${this.urlBase}usuario-publico`, datos);
    }

    ValidarHashUsuarioPublico(hash:string): Observable<boolean>{
      return this.http.post<boolean>(`${this.urlBase}validar-hash-usuario`,{
        codigoHash : hash
      });
    }
}