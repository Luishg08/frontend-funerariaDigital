import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';

@Component({
  selector: 'app-identificacion-usuario',
  standalone: false,
  templateUrl: './identificacion-usuario.component.html',
  styleUrl: './identificacion-usuario.component.css'
})
export class IdentificacionUsuarioComponent {
  fGroup: FormGroup=new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) { }

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario(){
    this.fGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]]
    });
  }

  IdentificarUsuario(){
    if(this.fGroup.invalid){
      alert('Debe ingresar los datos requeridos');
    }else{
      alert('Usuario identificado');
      let usuario = this.obtenerFormGroup['usuario'].value
      let clave = this.obtenerFormGroup['clave'].value
      this.servicioSeguridad.IdentificarUsuario(usuario,clave).subscribe({
        next: (data:UsuarioModel) => {
          console.log(data);
          
        },
        error: (error) => {
          console.log(error);
          
        }
      })
    }
    
  }

  get obtenerFormGroup(){
    return this.fGroup.controls;
  }
}
