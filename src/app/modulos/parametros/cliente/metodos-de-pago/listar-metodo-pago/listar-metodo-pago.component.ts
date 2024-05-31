import { Component } from '@angular/core';
import { MetodosPagoCliente } from '../../../../../modelos/metodos.pago.cliente.model';
import { ParametrosService } from '../../../../../servicios/parametros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-metodo-pago',
  standalone: false,
  templateUrl: './listar-metodo-pago.component.html',
  styleUrl: './listar-metodo-pago.component.css'
})
export class ListarMetodoPagoComponent {

  metodosPagos:MetodosPagoCliente[]= [];

  constructor(
    private servicioParametros: ParametrosService,
    private router: Router
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

  redirigirACrearMetodoPago() {
    this.router.navigate(['/parametros/crear-metodo-pago']);
  }
}
