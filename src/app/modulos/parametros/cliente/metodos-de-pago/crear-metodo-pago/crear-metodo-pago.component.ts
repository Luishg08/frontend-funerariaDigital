import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-metodo-pago',
  standalone: false,
  templateUrl: './crear-metodo-pago.component.html',
  styleUrl: './crear-metodo-pago.component.css'
})
export class CrearMetodoPagoComponent {

  fGroup: FormGroup= new FormGroup({})

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(){
    this.ConstruirFormulario();
  }

  ConstruirFormulario(){
    this.fGroup = this.fb.group({
      tipo: ['', Validators.required],
      datos: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    });
  }

  obtenerFormGroup(){
    this.fGroup.controls;
  }

}
