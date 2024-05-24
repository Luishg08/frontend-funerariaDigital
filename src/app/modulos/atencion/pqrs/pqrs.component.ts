import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'app-pqrs',
  standalone: false,
  templateUrl: './pqrs.component.html',
  styleUrl: './pqrs.component.css'
})
export class PqrsComponent {

  fGroup: FormGroup= new FormGroup({});

  constructor(
    private fbGroup: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) { }

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario(){
    this.fGroup= this.fbGroup.group({
      usuario: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      mensaje: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    });
  }

  EnviarPQRS(){
    if(this.fGroup.invalid){
      alert('Formulario invalido');
    }else{
      alert('Enviando PQRS');
      let correo =this.obtenerFormGroup['usuario'].value;
      let nombre = this.obtenerFormGroup['nombre'].value;
      let tipo = this.obtenerFormGroup['tipo'].value;
      let mensaje = this.obtenerFormGroup['mensaje'].value;
      this.servicioSeguridad.enviarMensajePqrs(correo, nombre, tipo, mensaje).subscribe({
        next: (data) => {
          console.log(data);
          alert('PQRS enviada');
        },
        error: (error) => {
          console.log(error);
          alert('Error al enviar la PQRS');
        }
      });
    }
  }

  get obtenerFormGroup(){
    return this.fGroup.controls;
  }
}
