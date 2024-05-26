import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
//import { nextTick } from 'process';
//import { error } from 'console';
import { UsuarioModel } from '../../../modelos/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-clave',
  standalone: false,
  templateUrl: './recuperar-clave.component.html',
  styleUrl: './recuperar-clave.component.css'
})
export class RecuperarClaveComponent {
  fbGroup: FormGroup=new FormGroup({});
  
  constructor(
    private fb: FormBuilder, 
    private servicioSeguridad: SeguridadService,
    private router: Router
  ){}

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario(){
    this.fbGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      recaptcha: ['', [Validators.required]]
    });
  }


  RecuperarClave(){
    if(this.fbGroup.invalid){
      alert('Debe ingresar los datos requeridos');
    }else{
      alert('Recuperando clave');
      let usuario = this.obtenerFormGroup['usuario'].value;
      this.servicioSeguridad.RecuperarClavePorUsuario(usuario).subscribe({
        next: (datos:UsuarioModel)=>{
          alert('Se ha enviado un correo con la nueva clave a '+datos.correo);
          this.router.navigate(['/identificar-usuario']);

        }, error: (error:any)=>{
          alert('Ha ocurrido un error la nueva contraseña');
        }
      })
    }
  }

  get obtenerFormGroup(){
    return this.fbGroup.controls;
  }
  
}
