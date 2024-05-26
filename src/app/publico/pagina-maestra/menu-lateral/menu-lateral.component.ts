import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';
import { CommonModule } from '@angular/common';
import { SeguridadRoutingModule } from '../../../modulos/seguridad/seguridad-routing.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicoService } from '../../../servicios/publico.service';

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
export class MenuLateralComponent{
    sesionActiva: boolean = false;
    mostrarBarraLateral: boolean = false;
    mostrarAdjuntarArchivo: boolean = false;
    correousuario = "";
    nombreusuario = "";
    @ViewChild('menuOpciones', { static: false }) menuOpciones!: ElementRef;

    constructor(
      private servicioSeguridad: SeguridadService,
      private servicioPublico: PublicoService

    ) {}

    ngOnInit(): void {
      this.ValidarSesion();
      this.mostrarCorreoyNombre();
    }
  
    toggleMenuLateral() {
      this.mostrarBarraLateral = !this.mostrarBarraLateral;
      if (this.mostrarBarraLateral) {
        document.getElementById('IconoMenu')!.style.width = '538px';
        this.mostrarCorreoyNombre();
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

  mostrarCorreoyNombre(){
    const nombreusuario = this.servicioPublico.ObtenerNombreUsuarioLS();
    
    if(nombreusuario){
      this.nombreusuario = nombreusuario;
    }

    const correousuario = this.servicioPublico.ObtenerCorreoUsuarioLS();
    if(correousuario){
      this.correousuario = correousuario;
    }
  }

  cargarArchivo(){
    console.log((document.getElementById('inputSeleccionarArchivo')! as HTMLInputElement).value);
    
  }
}
