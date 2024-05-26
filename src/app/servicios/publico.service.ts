import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicoService {

  constructor(
    private http: HttpClient
  ) { }


  ObtenerNombreUsuarioLS():string | null{
    let datosUsuario= localStorage.getItem("datos-usuario")
    if(datosUsuario){
      let usuario= JSON.parse(datosUsuario);
      return `${usuario.primerNombre} ${usuario.primerApellido}`;
    }
    return null;
  }

  ObtenerCorreoUsuarioLS():string | null{
    let datosUsuario= localStorage.getItem("datos-usuario")
    if(datosUsuario){
      let usuario= JSON.parse(datosUsuario);
      return usuario.correo;
    }
    return null;
  }

  cargarArchivo(){
    
  }

}
