import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';
import { Router } from '@angular/router';
import { ParametrosService } from '../../../servicios/parametros.service';
import { ClienteModel } from '../../../modelos/cliente.model';


@Component({
  selector: 'app-adquirir-plan',
  standalone: false,
  templateUrl: './adquirir-plan.component.html',
  styleUrl: './adquirir-plan.component.css'
})
export class AdquirirPlanComponent {
  sesionActiva: boolean = false;
  yatieneCliente: boolean = false;

  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router,
    private servicioParametros: ParametrosService
  ) { }

  ngOnInit() {
    this.ValidarSesion();
    this.VerificarSiYaTieneCliente()
    
  }

  RedigirirARegistroOIngreso(){
    if(this.sesionActiva==false){
      this.router.navigate(['/seguridad/identificar-usuario']);
      return
    }
    else if (this.yatieneCliente==false){
      this.router.navigate(['/parametros/crear-cliente']);
    }
    else{
      this.router.navigate(['/parametros/adquirir-plan']);
    }
  }

  ValidarSesion(){
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (datos:UsuarioValidadoModel) =>{
        if(datos.token!=""){
          this.sesionActiva=true;
        }else{
          this.sesionActiva=false;
        }
      },error:(err:any)=>{
        
      }
    })
}

  VerificarSiYaTieneCliente(){
    let idUsuario= this.servicioParametros.ObtenerIdUsuarioLS();
    if(!idUsuario){
      return;
    }
    this.servicioParametros.VerificarSiYaTieneCliente(idUsuario).subscribe({
      next: (datos:ClienteModel) =>{
        console.log("datos ",datos);
        if(datos.documento){
          this.yatieneCliente=true;
          localStorage.setItem("datos-cliente",JSON.stringify(datos));
        }else{
          this.yatieneCliente=false;
        }
      },error:(err:any)=>{
        console.log(err);
      }
    })
  }
}
