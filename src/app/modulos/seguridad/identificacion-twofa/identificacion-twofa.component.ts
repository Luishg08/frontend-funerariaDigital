import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-identificacion-twofa',
  standalone: false,
  templateUrl: './identificacion-twofa.component.html',
  styleUrl: './identificacion-twofa.component.css'
})
export class IdentificacionTwofaComponent {
  fbGroup: FormGroup=new FormGroup({});
  
  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario(){
    this.fbGroup = this.fb.group({
      Codigo2fa: ['', [Validators.required]]
    });
  }

  ConfirmarCodigo(){
    if(this.fbGroup.invalid){
      alert('Ingrese el codigo de verificacion');
    }else{
      alert('Confirmando codigo');
    }
  }

  get obtenerFormGroup(){
    return this.fbGroup.controls;
  }
}
