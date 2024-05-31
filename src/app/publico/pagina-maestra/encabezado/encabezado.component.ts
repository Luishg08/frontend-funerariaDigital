import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { nextTick } from 'process';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';
import { error } from 'console';
import { ParametrosService } from '../../../servicios/parametros.service';
import { ClienteModel } from '../../../modelos/cliente.model';
import { ClientePlanModel } from '../../../modelos/cliente.plan.model';
@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent {

  sesionActiva:boolean = false
  yatieneCliente: boolean = false;
  yaTienePlan: boolean = false;
  rutaActual: string = '';


  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router,
    private servicioParametros: ParametrosService
  ) {
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationStart) {
        this.rutaActual = event.url;
      }
    });
  }

  ngOnInit(): void {
    // initFlowbite();
    this.VerificarSiTieneClienteYPlan1()
    this.ValidarSesion();
  }

  ValidarSesion(){
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (datos:UsuarioValidadoModel) =>{
        if(datos.token!=""){
          this.sesionActiva=true;
        }else{
          this.sesionActiva=false;
        }
      },error:(err)=>{

      }
    })
  }

  VerificarSiTieneClienteYPlan(){
    let yaTieneCliente=false;
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
          console.log("ya tiene cliente desde nav");
          
        }else{
          console.log("no tiene cliente desde nav");
          this.router.navigate(['/parametros/crear-cliente']);
         
        }
      },error:(err:any)=>{
        console.log(err);
      }
    })

    this.servicioParametros.ObtenerClientePlanActivo(idUsuario).subscribe({
      next: (datos:ClientePlanModel|boolean) =>{
        if(datos == false){
          this.yaTienePlan=false;
          console.log("no tiene plan desde nav");
          if(this.rutaActual !== "/parametros/crear-cliente"){
          this.router.navigate(['/parametros/adquirir-plan']);
          console.log(datos);
          return
          }
        }
        else{
          this.yaTienePlan=true;
          console.log("ya tiene plan desde nav");
          this.router.navigate(['/parametros/solicitar-servicio-funerario']);
          console.log(datos);
          
        }
      },error:(err:any)=>{
        console.log(err);
      }
    })
    console.log("ya tiene cliente",yaTieneCliente);
    console.log("ya tiene plan",this.yaTienePlan);
    
    
  }

  VerificarSiTieneClienteYPlan1(){
    let yaTieneCliente=false;
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
          console.log("ya tiene cliente desde nav");
          
        }else{
          console.log("no tiene cliente desde nav");
          this.router.navigate(['/parametros/crear-cliente']);
         
        }
      },error:(err:any)=>{
        console.log(err);
      }
    })

    this.servicioParametros.ObtenerClientePlanActivo(idUsuario).subscribe({
      next: (datos:ClientePlanModel|boolean) =>{
        if(datos == false){
          this.yaTienePlan=false;
          console.log("no tiene plan desde nav");
          if(this.rutaActual !== "/parametros/crear-cliente"){
          this.router.navigate(['/parametros/adquirir-plan']);
          console.log(datos);
          return
          }
        }
        else{
          this.yaTienePlan=true;
          console.log("ya tiene plan desde nav");
          console.log(datos);
          
        }
      },error:(err:any)=>{
        console.log(err);
      }
    })
    console.log("ya tiene cliente",yaTieneCliente);
    console.log("ya tiene plan",this.yaTienePlan);
    
    
  }
  }
