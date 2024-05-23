import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  standalone: false,
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {
  fbGroup: FormGroup=new FormGroup({});

  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario(){
    this.fbGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      primerNombre: ['', [Validators.required, Validators.maxLength(50)]],
      segundoNombre: ['', [Validators.maxLength(50)]],
      primerApellido: ['', [Validators.required, Validators.maxLength(50)]],
      segundoApellido: ['', [Validators.maxLength(50)]],
      celular: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  CrearUsuario(){
    if(this.fbGroup.invalid){
      alert('Debe ingresar los datos requeridos');
    }else{
      alert('Usuario identificado');
    }
  }
  
  get obtenerFormGroup(){
    return this.fbGroup.controls;
  }
}
