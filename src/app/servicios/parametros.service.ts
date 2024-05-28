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
import { ClienteModel } from '../modelos/cliente.model';
import { HttpHeaders } from '@angular/common/http';
import { PlanModel } from '../modelos/plan.model';
import { ClientePlanModel } from '../modelos/cliente.plan.model';
import { MetodosPagoCliente } from '../modelos/metodos.pago.cliente.model';

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

  VerificarSiYaTieneCliente(usuarioId:string):Observable<ClienteModel>{
    return this.http.post<ClienteModel>(`${this.urlBase}usuario-tiene-cliente`,{
      idUsuario: usuarioId
    });
  }



crearCliente(nombre:string,apellido:string,documento:string,celular:string,correo:string):Observable<ClienteModel>{
  let idUsuario= this.ObtenerIdUsuarioLS()
  let token = ""
  let datosSesion= localStorage.getItem("datos-sesion")
    if(datosSesion){
      let usuario= JSON.parse(datosSesion);
      token = usuario.token;
    }
    console.log(token+" "+"este es el token");
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log(nombre, apellido, documento, celular, correo, idUsuario);
    

  return this.http.post<ClienteModel>(`${this.urlBase}cliente`,{
    nombre: nombre,
    apellido: apellido,
    documento: documento,
    celular: celular,
    correo: correo,
    id_usuario: idUsuario,
    estado_cliente: false
  }, { headers: headers }
  )
}

obtenerPlanes():Observable<PlanModel[]>{
  return this.http.get<PlanModel[]>(`${this.urlBase}plan`);
}

ObtenerClientePlanActivo(idUsuario:string):Observable<ClientePlanModel|boolean>{
  return this.http.post<ClientePlanModel|boolean>(`${this.urlBase}verificar-estado-cliente`,{
    idUsuario: idUsuario
  });
}

ObtenerClienteConCorreo(correo:string):Observable<ClienteModel|null>{
  return this.http.post<ClienteModel|null>(`${this.urlBase}cliente-con-correo`,{
    correo: correo
  });
}


AdquirirPlan(idPlan:string,dato:ClienteModel, precio:any, esanual:boolean):Observable<ClientePlanModel>{
  const fechaContrato = new Date();
  if(esanual){
  fechaContrato.setFullYear(fechaContrato.getFullYear() + 1);
  }
  else{
    fechaContrato.setMonth(fechaContrato.getMonth() + 1);
  }

  return this.http.post<ClientePlanModel>(`${this.urlBase}client-plan`,{
    tarifa: precio,
    fechaInicio: new Date(),
    fechaContrato: fechaContrato,
    clienteId: dato.id_cliente,
    estadoClientePlan: true,
    planId: Number(idPlan)
  });
  }

obtenermetodospagocliente(idUsuario:string):Observable<MetodosPagoCliente[]>{
  return this.http.post<MetodosPagoCliente[]>(`${this.urlBase}metodos-de-pago-de-un-cliente`,{
    idUsuario: idUsuario
  });
}

}