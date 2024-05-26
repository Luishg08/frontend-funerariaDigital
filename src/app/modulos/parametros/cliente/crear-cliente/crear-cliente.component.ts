import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParametrosService } from '../../../../servicios/parametros.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css'
})
export class CrearClienteComponent {
  fbGroup: FormGroup=new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicioParametros: ParametrosService
  ) { }

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario(){
    this.fbGroup = this.fb.group({
      correoCliente: ['', [Validators.required, Validators.email]],
      nombreCliente: ['', [Validators.required, Validators.min(2),Validators.maxLength(50)]],
      apellidoCliente: ['', [Validators.min(2),Validators.maxLength(50)]],
      documentoCliente: ['', [Validators.required, Validators.min(2),Validators.maxLength(50)]],
      celularCliente: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  get obtenerFormGroup(){
    return this.fbGroup.controls;
  }

  CrearCliente(){
    if(this.fbGroup.invalid){
      alert('Debe ingresar los datos requeridos');
    }else{
      let correo = this.obtenerFormGroup['correoCliente'].value
      let nombre = this.obtenerFormGroup['nombreCliente'].value
      let apellido = this.obtenerFormGroup['apellidoCliente'].value
      let documento = this.obtenerFormGroup['documentoCliente'].value
      let celular = this.obtenerFormGroup['celularCliente'].value
      this.servicioParametros.crearCliente(nombre,apellido,documento,celular,correo).subscribe({
        next: (data:any) => {
          console.log(data);
          if(data.id_cliente == undefined || data.id_cliente == null){
            alert('Error al crear el cliente')
          }else{
            console.log(data);
            alert('Cliente creado correctamente')
            this.router.navigate(['/parametros/adquirir-plan'])
          }
        },
        error: (error: any) => {
          console.log(error);
          alert('Error al crear el cliente')
        }
      });
    }
  }
}
