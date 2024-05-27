import { Component } from '@angular/core';
import { ParametrosService } from '../../../../servicios/parametros.service';
import { BeneficiarioModel } from '../../../../modelos/beneficiario.model';
import { log } from 'console';

@Component({
  selector: 'app-mis-beneficiarios',
  standalone: false,
  templateUrl: './mis-beneficiarios.component.html',
  styleUrl: './mis-beneficiarios.component.css'
})
export class MisBeneficiariosComponent {

  beneficiarios: BeneficiarioModel[] = [];

  constructor(
    private servicioParametros: ParametrosService
  ){}

  ngOnInit() {
    this.datosBeneficiarios();
  }


  datosBeneficiarios(){
    let idUsuario= this.servicioParametros.ObtenerIdUsuarioLS();
    if(idUsuario){
      this.servicioParametros.obtenerBeneficiariosCliente(idUsuario).subscribe({
        next: (data) => {
          console.log(data);
          this.beneficiarios = data;
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
