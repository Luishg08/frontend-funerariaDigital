import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametrosService } from '../../../servicios/parametros.service';

@Component({
  selector: 'app-solicitar-servicio-funerario',
  templateUrl: './solicitar-servicio-funerario.component.html',
  styleUrl: './solicitar-servicio-funerario.component.css'
})
export class SolicitarServicioFunerarioComponent {
  fGroup: FormGroup=new FormGroup({});
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private servicioParametros: ParametrosService
  ) { 
    
  }

  ngOnInit() 
  {
    this.cargarDatos();
    (document.getElementById('hora_ingreso') as HTMLInputElement).value = "15:00"
    
  }

  ConstruirFormulario(){
    this.fGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]]
    });
  }

  cargarDatos(){
    //Obtener Select de beneficiarios
    let selectBeneficiarios= document.getElementById('beneficiario');
    //Obtener idUsuario con localStorage
    let idUsuario= this.servicioParametros.ObtenerIdUsuarioLS();
    console.log(idUsuario);
    if(idUsuario){
      this.servicioParametros.obtenerBeneficiariosCliente(idUsuario).subscribe({
        next: (data) => {
          data.forEach((beneficiario) => {
            let option = document.createElement('option');
            option.value= beneficiario.id_beneficiario!.toString();
            option.text= `${beneficiario.nombre} ${beneficiario.apellido}`;
            selectBeneficiarios!.appendChild(option);
          })
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    let selectDepartamento= document.getElementById('departamentoCuerpo');
    this.servicioParametros.ObtenerDepartamentos().subscribe({
      next: (data) => {
        data.forEach((departamento) => {
          let option = document.createElement('option');
          option.value= departamento.idDepartamento!.toString();
          option.text= departamento.nombre!;
          selectDepartamento!.appendChild(option);
        })
      },
      error: (error) => {
        console.log(error);
      }
    })

    let selectDepartamentoServicio= document.getElementById('departamentoServicio');
    this.servicioParametros.ObtenerDepartamentos().subscribe({
      next: (data) => {
        data.forEach((departamento) => {
          let option = document.createElement('option');
          option.value= departamento.idDepartamento!.toString();
          option.text= departamento.nombre!;
          selectDepartamentoServicio!.appendChild(option);
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  cargarCiudadesDepartamento(){
   let selectCiudad= document.getElementById('ciudadCuerpo');
 
    if((document.getElementById('departamentoCuerpo') as HTMLInputElement).value !== 'no'){
    let idDepartamento = Number((document.getElementById('departamentoCuerpo') as HTMLInputElement).value);
    this.servicioParametros.ObtenerCiudades(idDepartamento).subscribe({
      next: (data) => {
        //eliminar todos los elementos del select
        selectCiudad!.innerHTML= '';
        data.forEach((ciudad) => {
          let option = document.createElement('option');
          option.value= ciudad.idCiudad!.toString();
          option.text= ciudad.nombre!;
          selectCiudad!.appendChild(option);
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  let selectCiudadServicio= document.getElementById('ciudadServicio');
 
    if((document.getElementById('departamentoServicio') as HTMLInputElement).value !== 'no'){
    let idDepartamento = Number((document.getElementById('departamentoServicio') as HTMLInputElement).value);
    this.servicioParametros.ObtenerCiudades(idDepartamento).subscribe({
      next: (data) => {
        //eliminar todos los elementos del select
        selectCiudadServicio!.innerHTML= '';
        data.forEach((ciudad) => {
          let option = document.createElement('option');
          option.value= ciudad.idCiudad!.toString();
          option.text= ciudad.nombre!;
          selectCiudadServicio!.appendChild(option);
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
cargarSedesDeUnaCiudad(){
  let selectSede= document.getElementById('sede');
  let idCiudad = Number((document.getElementById('ciudadServicio') as HTMLInputElement).value);
  this.servicioParametros.ObtenerSedesDeUnaCiudad(idCiudad).subscribe({
    next: (data) => {
      //eliminar todos los elementos del select
      selectSede!.innerHTML= '';
      data.forEach((sede) => {
        let option = document.createElement('option');
        option.value= sede.idSede!.toString();
        option.text= `${sede.nombre} Ubicada en: ${sede.direccion}`;
        selectSede!.appendChild(option);
      })
    },
    error: (error) => {
      console.log(error);
    }
  })
}

cargarSalasDeUnaSede(){
  let selectSala= document.getElementById('sala');
  let idSede = Number((document.getElementById('sede') as HTMLInputElement).value);
  this.servicioParametros.ObtenerSalasDeUnaSede(idSede).subscribe({
    next: (data) => {
      //eliminar todos los elementos del select
      selectSala!.innerHTML= '';
      data.forEach((sala) => {
        let option = document.createElement('option');
        option.value= sala.idSala!.toString();
        option.text= `Sala número ${sala.numero_sala}, con capacidad para ${sala.capacidad} personas`;
        selectSala!.appendChild(option);
      })
    },
    error: (error) => {
      console.log(error);
    }
  })
}

}
