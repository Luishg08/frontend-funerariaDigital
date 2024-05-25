import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {

    sesionActiva: boolean = false;

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
