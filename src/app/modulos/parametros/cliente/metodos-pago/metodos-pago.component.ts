import { Component } from '@angular/core';
import { MetodosPagoCliente } from '../../../../modelos/metodos.pago.cliente.model';
import { ParametrosService } from '../../../../servicios/parametros.service';

@Component({
  selector: 'app-metodos-pago',
  standalone: false,
  templateUrl: './metodos-pago.component.html',
  styleUrl: './metodos-pago.component.css'
})
export class MetodosPagoComponent {
  
  metodosPagos:MetodosPagoCliente[]= [];

  constructor(
    private servicioParametros: ParametrosService
  ){}

  ngOnInit() {
    this.obtenerMetodosPago();
  }

  obtenerMetodosPago(){
    let idUsuario= this.servicioParametros.ObtenerIdUsuarioLS();
    if(idUsuario){
      this.servicioParametros.obtenermetodospagocliente(idUsuario).subscribe({
        next: (data) => {
          console.log(data);
          this.metodosPagos = data;
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
