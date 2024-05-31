import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametrosService } from '../../../../../servicios/parametros.service';
import { MetodosPagoCliente } from '../../../../../modelos/metodos.pago.cliente.model';

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
    private parametrosService: ParametrosService
  ) { }

  ngOnInit(){
    this.ConstruirFormulario();
  }

  ConstruirFormulario(){
    this.fGroup = this.fb.group({
      tipo: ['', Validators.required],
      datos: ['', [Validators.required, Validators.pattern('^[0-9]{16,19}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  get obtenerFormGroup(){
    return this.fGroup.controls;
  }


  AgregarMetodoPago(){
    if(this.fGroup.valid){
      let tipo = this.obtenerFormGroup['tipo'].value;
      let datos = this.obtenerFormGroup['datos'].value;
      let cvv = this.obtenerFormGroup['cvv'].value;
      let cliente = JSON.parse(localStorage.getItem("datos-cliente")!)
      this.parametrosService.crearMetodoPagoCliente(tipo, datos, cvv, cliente).subscribe({
        next: (datos:MetodosPagoCliente) =>{
          if(datos.idMetodoPagoCliente){
            console.log(datos);
            alert('Método de pago creado exitosamente');
            this.fGroup.reset();
          }
        },error:(err:any)=>{
          console.log(err);
        }
    })
    } else {
      console.log('Debe completar los campos requeridos con datos válidos');
    }
  }

}
