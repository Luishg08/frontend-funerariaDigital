import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { nextTick } from 'process';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';
import { error } from 'console';
import { MenuLateralComponent } from "../menu-lateral/menu-lateral.component";

@Component({
    selector: 'app-encabezado',
    standalone: true,
    templateUrl: './encabezado.component.html',
    styleUrl: './encabezado.component.css',
    imports: [RouterOutlet, RouterLink, CommonModule, MenuLateralComponent]
})
export class EncabezadoComponent {

  sesionActiva:boolean = false


  constructor(
    private servicioSeguridad: SeguridadService
  ) {}

  ngOnInit(): void {
    // initFlowbite();
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
      },error:(err:any)=>{

      }
    })
  }
  
}
