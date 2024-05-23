import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-clave',
  standalone: false,
  templateUrl: './recuperar-clave.component.html',
  styleUrl: './recuperar-clave.component.css'
})
export class RecuperarClaveComponent {
  fbGroup: FormGroup=new FormGroup({});
  
  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario(){
    this.fbGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]]
    });
  }

  RecuperarClave(){
    if(this.fbGroup.invalid){
      alert('Debe ingresar los datos requeridos');
    }else{
      alert('Recuperando clave');
    }
  }

  get obtenerFormGroup(){
    return this.fbGroup.controls;
  }
}
