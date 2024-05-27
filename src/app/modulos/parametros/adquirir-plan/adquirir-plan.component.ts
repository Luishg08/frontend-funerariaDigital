import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';
import { Router } from '@angular/router';
import { ParametrosService } from '../../../servicios/parametros.service';
import { ClienteModel } from '../../../modelos/cliente.model';
import { PlanModel } from '../../../modelos/plan.model';


@Component({
  selector: 'app-adquirir-plan',
  standalone: false,
  templateUrl: './adquirir-plan.component.html',
  styleUrl: './adquirir-plan.component.css'
})
export class AdquirirPlanComponent {
  sesionActiva: boolean = false;
  yatieneCliente: boolean = false;
  planesmensual: boolean = true;
  planesanual: boolean = false;

  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router,
    private servicioParametros: ParametrosService
  ) { }

  ngOnInit() {
    this.ValidarSesion();
    this.VerificarSiYaTieneCliente();
    this.ObtenerPlanes()
    this.mostrarPlanesMensual();
    
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

  planes: PlanModel[] = [];


ObtenerPlanes(){
  this.servicioParametros.obtenerPlanes().subscribe({
    next:(data:PlanModel[])=>{
      this.planes = data;
    },
    error: (err) => {
      alert("No se pudo listar los planes");
    }
  });
}

ContinuarConPlanSeleccionado(){
  let selectRadioSeleccionado = document.querySelector('input[name="plan"]:checked') as HTMLInputElement;
  if(selectRadioSeleccionado){
    let idPlan = selectRadioSeleccionado!.value
    console.log("Este es el id del plan seleccionado",idPlan);
    alert("Ha seleccionado el plan con id "+idPlan);
  }
  else{
    alert("Debe seleccionar un plan");
    return;
  }

}

mostrarPlanesMensual(){
  this.planesmensual=true;
  this.planesanual=false;
  let selectBotonMensual = document.getElementById("botonMensual") as HTMLButtonElement;
  let selectBotonAnual = document.getElementById("botonAnual") as HTMLButtonElement;
  selectBotonMensual!.style.backgroundColor = "#713abe";
  selectBotonAnual!.style.backgroundColor = "#b9b4c7";
}

mostrarPlanesAnual(){
  this.planesmensual=false;
  this.planesanual=true;
  let selectBotonAnual = document.getElementById("botonAnual") as HTMLButtonElement;
  let selectBotonMensual = document.getElementById("botonMensual") as HTMLButtonElement;
  selectBotonAnual!.style.backgroundColor = "#713abe";
  selectBotonMensual!.style.backgroundColor = "#b9b4c7";
}
}