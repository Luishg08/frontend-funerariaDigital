import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';

@Component({
  selector: 'app-registro-publico-usuarios',
  standalone: false,
  templateUrl: './registro-publico-usuarios.component.html',
  styleUrl: './registro-publico-usuarios.component.css'
})
export class RegistroPublicoUsuariosComponent {
  fbGroup: FormGroup=new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ){}

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario(){
    this.fbGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      primerNombre: ['', [Validators.required, Validators.min(2),Validators.maxLength(50)]],
      segundoNombre: ['', [Validators.min(2),Validators.maxLength(50)]],
      primerApellido: ['', [Validators.required, Validators.min(2),Validators.maxLength(50)]],
      segundoApellido: ['', [Validators.min(2),Validators.maxLength(50)]],
      celular: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  Registrarse(){
    let campos= this.obtenerFormGroup;
    let datos={
      correo: campos["usuario"].value,
      primerNombre: campos["primerNombre"].value,
      segundoNombre: campos["segundoNombre"].value,
      primerApellido: campos["primerApellido"].value,
      segundoApellido: campos["segundoApellido"].value,
      celular: campos["celular"].value,
    }

    this.servicioSeguridad.VerificarSiYaExisteUsuario(datos.correo).subscribe({
      next: (respuesta:UsuarioModel|null)=>{
        if(respuesta){
          alert("Ya existe un usuario con el correo electrónico ingresado, inicie sesión o valide su correo electrónico");
        }
        else{
          this.servicioSeguridad.RegistrarUsuarioPublico(datos).subscribe({
            next: (respuesta:UsuarioModel)=>{
              alert("Usuario registrado correctamente, se ha envidao un mensaje para validar su direccion de correo electrónico");
            },
            error: (err)=>{
              alert("Error al registrar el usuario");
            }
          })
        }
      },
      error: (err)=>{
      }
    })

  }
  
  get obtenerFormGroup(){
    return this.fbGroup.controls;
  }
}
