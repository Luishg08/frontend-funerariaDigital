import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../../../modelos/usuario.model';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'app-cambiar-clave',
  standalone: false,
  templateUrl: './cambiar-clave.component.html',
  styleUrl: './cambiar-clave.component.css'
})
export class CambiarClaveComponent {
  fGroup: FormGroup= new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicioSeguridad: SeguridadService
  ){}

  ngOnInit(){
    this.ConstruirFormulario();
  }

  ConstruirFormulario(){
    this.fGroup= this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      claveActual: ['', [Validators.required]],
      claveNueva: ['', [Validators.required, Validators.minLength(5)]],
      confirmacionClave: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  CambiarClave(){
    if(this.fGroup.invalid){
      alert('Debe ingresar los datos requeridos');
    }else{
      alert('Cambiando clave');
      let datos= this.servicioSeguridad.ObtenerDatosUsuarioClaveLS();
      console.log(datos);
    }
  } 

  


  get obtenerFormGroup (){
    return this.fGroup.controls
  }
}
