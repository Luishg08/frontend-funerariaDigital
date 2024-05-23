import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-identificacion-usuario',
  standalone: false,
  templateUrl: './identificacion-usuario.component.html',
  styleUrl: './identificacion-usuario.component.css'
})
export class IdentificacionUsuarioComponent {
  fGroup: FormGroup=new FormGroup({});

  constructor(
    private fb: FormBuilder
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
    }
    
  }

  get obtenerFormGroup(){
    return this.fGroup.controls;
  }
}
