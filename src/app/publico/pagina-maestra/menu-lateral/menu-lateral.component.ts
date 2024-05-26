import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';
import { CommonModule } from '@angular/common';
import { SeguridadRoutingModule } from '../../../modulos/seguridad/seguridad-routing.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule,
    SeguridadRoutingModule, 
    RouterOutlet, 
    RouterLink, 
    ReactiveFormsModule, 
    FormsModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {
    sesionActiva: boolean = false;
    mostrarBarraLateral: boolean = false;

    constructor(
      private servicioSeguridad: SeguridadService

    ) {}

    ngOnInit(): void {
      // initFlowbite();
      this.ValidarSesion();
    }
  
    toggleMenuLateral() {
      this.mostrarBarraLateral = !this.mostrarBarraLateral;
      if (this.mostrarBarraLateral) {
        document.getElementById('IconoMenu')!.style.width = '538px';
      }
      else{
        document.getElementById('IconoMenu')!.style.width = '30px';
      }
    }


    ValidarSesion(){
      this.servicioSeguridad.ObtenerDatosSesion().subscribe({
        next: (datos:UsuarioValidadoModel) =>{
          if(datos.token!=""){
            this.sesionActiva=true;
          }else{
            this.sesionActiva=false;
            this.mostrarBarraLateral = false;
          }
        },error:(err:any)=>{
          
        }
      })
  }
}
