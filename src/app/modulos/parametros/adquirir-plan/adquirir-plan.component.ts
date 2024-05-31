import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';
import { Router } from '@angular/router';
import { ParametrosService } from '../../../servicios/parametros.service';
import { ClienteModel } from '../../../modelos/cliente.model';
import { PlanModel } from '../../../modelos/plan.model';
import { ClientePlanModel } from '../../../modelos/cliente.plan.model';
import { FormBuilder } from '@angular/forms';
import { MetodosPagoCliente } from '../../../modelos/metodos.pago.cliente.model';


@Component({
  selector: 'app-adquirir-plan',
  standalone: false,
  templateUrl: './adquirir-plan.component.html',
  styleUrl: './adquirir-plan.component.css'
})
export class AdquirirPlanComponent {
  metodosPago: MetodosPagoCliente[] = [];
  sesionActiva: boolean = false;
  yatieneCliente: boolean = false;
  planesmensual: boolean = true;
  planesanual: boolean = false;
  idPlanSeleccionado:any


  formularioPago = this.fb.group({
    metodoPago: [''],
    numeroTarjeta: [''],
    fechaVencimiento: [''],
    cvv: ['']
  });

  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router,
    private servicioParametros: ParametrosService,
    private fb : FormBuilder
  ) { }

  ngOnInit() {
    this.ValidarSesion();
    this.mostrarPlanesMensual();
    this.VerificarSiYaTieneCliente();
    this.ObtenerPlanes()

    
  }

ocultarPlanes(){
  let selectRadioSeleccionado = document.querySelector('input[name="plan"]:checked') as HTMLInputElement;
  if(!selectRadioSeleccionado){
    alert("Debe seleccionar un plan");
    return;
  }
  let idPlan = selectRadioSeleccionado!.value
  let planSeleccionado = this.planes.find(plan => plan.id == idPlan); 
  this.idPlanSeleccionado = planSeleccionado!.id;
  console.log("idPlanSeleccionado",this.idPlanSeleccionado);
  let selectPlanes = document.getElementById("planes") as HTMLDivElement;
  selectPlanes!.style.display = "none";
  let selectMetodosPago = document.getElementById("metodosPago") as HTMLDivElement;
  selectMetodosPago!.style.display = "flex";
}

Pagar(){
  let selectRadioSeleccionado = document.querySelector('input[id="radioMetodoPago"]:checked') as HTMLInputElement;
  if(!selectRadioSeleccionado){
    alert("Debe seleccionar un metodo de pago");
    return;
  }
  let esanual = false
  let idPlan = this.idPlanSeleccionado
  let planSeleccionado = this.planes.find(plan => plan.id == idPlan);
  let tarifa: any = planSeleccionado!.mensualidad
  if(this.planesanual){
    tarifa = (tarifa*12)*0.75
    esanual = true
  }
  this.servicioParametros.AdquirirPlan(idPlan, JSON.parse(localStorage.getItem("datos-cliente")!),tarifa, esanual).subscribe({
    next:(data:ClientePlanModel)=>{
      console.log(data);
      alert("Plan adquirido con exito");
      this.router.navigate(['/inicio']);
    },
    error: (err) => {
      alert("No se pudo adquirir el plan");
    }
  });
  console.log("Este es el id del plan seleccionado",idPlan);
  alert("Ha seleccionado el plan con id "+idPlan);
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
  
  this.servicioParametros.obtenermetodospagocliente(this.servicioParametros.ObtenerIdUsuarioLS()!).subscribe({
    next:(data:MetodosPagoCliente[])=>{
      this.metodosPago = data;
    },
    error: (err) => {
      alert("No se pudo listar los metodos de pago");
    }
  });
  
  
  
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