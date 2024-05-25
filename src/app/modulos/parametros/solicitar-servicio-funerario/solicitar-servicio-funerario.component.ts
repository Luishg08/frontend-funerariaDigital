import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametrosService } from '../../../servicios/parametros.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    this.ConstruirFormulario();
    
  }

  ConstruirFormulario(){
    this.fGroup = this.fb.group({
      beneficiario: ["",Validators.required],
      departamentoCuerpo: ["",Validators.required],
      ciudadCuerpo: ["",Validators.required],
      sepultura: ["",Validators.required],
      fecha_ingreso: ["",Validators.required],
      hora_ingreso: ["00:00",Validators.required],
      departamentoServicio: ["",Validators.required],
      ciudadServicio: ["",Validators.required],
      sede: ["",Validators.required],
      sala: ["",Validators.required],
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
   selectCiudad!.innerHTML = '';
   let selectSede= document.getElementById('sede');
    selectSede!.innerHTML = '';
    selectSede!.innerHTML = '<option class="text-gray-400"  disabled selected hidden>Escoja una sede</option>'
    let selectSala= document.getElementById('sala');
    selectSala!.innerHTML = '';
    selectSala!.innerHTML = '<option class="text-gray-400"  disabled selected hidden>Seleccione una de las salas</option>'
 
    if((document.getElementById('departamentoCuerpo') as HTMLInputElement).value !== 'no'){
    let idDepartamento = Number((document.getElementById('departamentoCuerpo') as HTMLInputElement).value);
    this.servicioParametros.ObtenerCiudades(idDepartamento).subscribe({
      next: (data) => {
        //eliminar todos los elementos del select
        selectCiudad!.innerHTML= '';
        selectCiudad!.innerHTML = '<option class="text-gray-400" disabled selected hidden>Escoja una ciudad</option>'
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
        selectCiudadServicio!.innerHTML = '<option class="text-gray-400" value="" disabled selected hidden>Escoja una ciudad</option>'
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
  let selectSala= document.getElementById('sala');
  selectSala!.innerHTML = '';
  selectSala!.innerHTML = '<option class="text-gray-400" value="" disabled selected hidden>Seleccione una de las salas</option>'
  let selectSede= document.getElementById('sede');
  let idCiudad = Number((document.getElementById('ciudadServicio') as HTMLInputElement).value);
  this.servicioParametros.ObtenerSedesDeUnaCiudad(idCiudad).subscribe({
    next: (data) => {
      //eliminar todos los elementos del select
      selectSede!.innerHTML= '';
      selectSede!.innerHTML = '<option class="text-gray-400" value="" disabled selected hidden>Escoja una sede</option>'
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
      selectSala!.innerHTML = '<option class="text-gray-400" value="" disabled selected hidden>Seleccione una de las salas</option>'
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

get obtenerFormGroup(){
  return this.fGroup.controls;
}

  SolicitarServicioFunerario(){
    if(this.fGroup.invalid){
      alert('Debe ingresar los datos requeridos');
      return
    }
    const selectBeneficiario = document.getElementById('beneficiario') as HTMLSelectElement;
    const beneficiarioText = selectBeneficiario.options[selectBeneficiario.selectedIndex].text;
    const confirmacion = confirm(`Va a solicitar un servicio funerario para su beneficiario(a) ${beneficiarioText}. ¿Desea continuar con la solicitud?`);
    if (confirmacion) {
      console.log('Solicitud de servicio funerario enviada');
      let ubicacion_cuerpo = Number(this.obtenerFormGroup['ciudadCuerpo'].value)
      let tipo_sepultura = this.obtenerFormGroup['sepultura'].value;
      let sala_id = Number(this.obtenerFormGroup['sala'].value)
      let beneficiario_id = Number(this.obtenerFormGroup['beneficiario'].value)
    
      let fecha_hora_ingreso = `${this.obtenerFormGroup['fecha_ingreso'].value} ${this.obtenerFormGroup['hora_ingreso'].value}:00`;
      let fecha = new Date(fecha_hora_ingreso);
      fecha.setHours(fecha.getHours() + 1);

      let year = fecha.getFullYear();
      let month = ("0" + (fecha.getMonth() + 1)).slice(-2); // Los meses en JavaScript comienzan en 0, por lo que se suma 1
      let day = ("0" + fecha.getDate()).slice(-2);
      let hours = ("0" + fecha.getHours()).slice(-2);
      let minutes = ("0" + fecha.getMinutes()).slice(-2);

      let fecha_hora_salida = `${year}-${month}-${day} ${hours}:${minutes}:00`;

      this.servicioParametros.solicitarServicioFunerario(ubicacion_cuerpo, tipo_sepultura, sala_id, beneficiario_id,fecha_hora_ingreso, fecha_hora_salida).subscribe({
        next: (data:any) => {
          if (data.message) {
            console.log('Error al solicitar el servicio funerario:', data.message);
            alert('Error al solicitar el servicio funerario: '+ data.message);
          } else {
            console.log(data);
            
          }
          
        },
        error: (error) => {
          console.log(error);
          alert('Error al solicitar el servicio funerario');
        }
      })
    } 
  }

}
