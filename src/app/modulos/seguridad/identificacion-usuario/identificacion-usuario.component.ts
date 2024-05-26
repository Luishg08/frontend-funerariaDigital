import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';
import { MD5 } from 'crypto-js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-identificacion-usuario',
  templateUrl: './identificacion-usuario.component.html',
  styleUrl: './identificacion-usuario.component.css'
})
export class IdentificacionUsuarioComponent {
  fGroup: FormGroup=new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario(){
    this.fGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]],
      recaptcha: ['', [Validators.required]]
    });
  }

  IdentificarUsuario(){
    if(this.fGroup.invalid){
      alert('Debe ingresar los datos requeridos');
    }else{
      if(this.obtenerFormGroup['recaptcha'].value == null || this.obtenerFormGroup['recaptcha'].value == undefined){
        alert('Debe validar el recaptcha');
        return;
      }
      alert('Usuario identificado');
      let usuario = this.obtenerFormGroup['usuario'].value
      let clave = this.obtenerFormGroup['clave'].value
      let claveCifrada= MD5(clave).toString();
      this.servicioSeguridad.IdentificarUsuario(usuario,claveCifrada).subscribe({
        next: (data:UsuarioModel) => {
          console.log(data);
          if(data._id == undefined || data._id == null){
            alert('Credenciales incorrectas o requiere la validación del correo electrónico')
          }else{

          console.log(data);
          if(this.servicioSeguridad.AlmacenarDatosUsuarioIdentificado(data)){
            this.router.navigate(['/seguridad/identificacion-twofa'])
          }
        }         
      },
        error: (error: any) => {
          console.log(error);
          
        }
      })
    }
    
  }

  get obtenerFormGroup(){
    return this.fGroup.controls;
  }
}
