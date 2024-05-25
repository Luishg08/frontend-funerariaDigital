import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BeneficiarioModel } from '../modelos/beneficiario.model';
import { DepartamentoModel } from '../modelos/Departamento.model';
import { CiudadModel } from '../modelos/ciudad.model';
import { SedeModel } from '../modelos/sede.model';
import { SalaModel } from '../modelos/sala.model';
import { ServicioFunerarioModel } from '../modelos/servicio.funerario.model';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  urlBase: string = ConfiguracionRutasBackend.urlLogicaNegocio

  constructor(
    private http: HttpClient
  ) { }

  obtenerBeneficiariosCliente(usuarioId:string): Observable<BeneficiarioModel[]>{
    return this.http.post<BeneficiarioModel[]>(`${this.urlBase}beneficiarios-de-cliente`, {
      idUsuario: usuarioId, 
    });
  }

  ObtenerIdUsuarioLS():string | null{
    let datosUsuario= localStorage.getItem("datos-usuario")
    if(datosUsuario){
      let usuario= JSON.parse(datosUsuario);
      return usuario._id;
    }
    return null;
  }

  ObtenerDepartamentos():Observable<DepartamentoModel[]>{
    return this.http.get<DepartamentoModel[]>(`${this.urlBase}departamento`);
  }

  ObtenerCiudades(idDepartamento:number):Observable<CiudadModel[]>{
    return this.http.post<CiudadModel[]>(`${this.urlBase}ciudades-de-un-departamento`,{
      idDepartamento: idDepartamento
    });
  }

  ObtenerSedesDeUnaCiudad(idCiudad:number):Observable<SedeModel[]>{
    return this.http.post<SedeModel[]>(`${this.urlBase}sedes-de-una-ciudad`,{
      idCiudad: idCiudad
    });
  }

  ObtenerSalasDeUnaSede(idSede:number):Observable<SalaModel[]>{
    return this.http.post<SalaModel[]>(`${this.urlBase}salas-de-una-sede`,{
      idSede: idSede
    });
  }

  solicitarServicioFunerario(ubicacion_cuerpo: number, tipo_sepultura: string, sala_id: number, beneficiario_id: number, 
     fecha_hora_ingreso: string, fecha_hora_salida: string,): Observable<Object>{
    return this.http.post(`${this.urlBase}solicitar-servicio`,{
      ubicacion_cuerpo: ubicacion_cuerpo,
      tipo_sepultura: tipo_sepultura,
      servicio_traslado: false,
      fecha_hora_ingreso: fecha_hora_ingreso,
      fecha_hora_salida: fecha_hora_salida,
      codigo_unico: "",
      notificado: false,
      estado_codigo_unico: false,
      beneficiarioId : beneficiario_id,
      salaId: sala_id
      })
}
}
