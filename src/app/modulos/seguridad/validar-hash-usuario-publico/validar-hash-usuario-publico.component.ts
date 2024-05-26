import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'app-validar-hash-usuario-publico',
  standalone: true,
  imports: [],
  templateUrl: './validar-hash-usuario-publico.component.html',
  styleUrl: './validar-hash-usuario-publico.component.css'
})
export class ValidarHashUsuarioPublicoComponent {
  validado= false; 
  hash: string = " ";

  constructor( 
    private servicioSeguridad: SeguridadService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(){
    this.hash = this.route.snapshot.params["hash"];
   // this.ValidarHash();
  }
}
