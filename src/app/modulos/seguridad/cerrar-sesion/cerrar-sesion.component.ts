import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerrar-sesion',
  standalone: true,
  imports: [],
  templateUrl: './cerrar-sesion.component.html',
  styleUrl: './cerrar-sesion.component.css'
})
export class CerrarSesionComponent {

  constructor(
    private servicoSeguridad: SeguridadService,
    private router: Router
  ){}

  ngOnInit(){
    this.cerrarSesion();
  }

  cerrarSesion(){
    console.log("Cerrando Sesion");
    this.servicoSeguridad.RemoverDatosUsuarioValidado();
    this.router.navigate([""]);
  }
}
