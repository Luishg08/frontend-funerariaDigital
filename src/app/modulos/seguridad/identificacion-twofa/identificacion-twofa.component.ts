import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router } from '@angular/router';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';

@Component({
  selector: 'app-identificacion-twofa',
  standalone: false,
  templateUrl: './identificacion-twofa.component.html',
  styleUrl: './identificacion-twofa.component.css'
})
export class IdentificacionTwofaComponent {
  fbGroup: FormGroup=new FormGroup({});
  usuarioId: string = '';
  
  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
  ){}

  ngOnInit() {
    let datos= this.servicioSeguridad.ObtenerDatosUsuarioLS();
    if(datos!=null){
      this.usuarioId= datos._id!;
      this.ConstruirFormulario();
    }else{
      this.router.navigate(['/seguridad/identificar-usuario']);
    }

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
      let codigo2fa = this.obtenerFormGroup['Codigo2fa'].value;
      this.servicioSeguridad.ValidarCodigo2fa(this.usuarioId,codigo2fa).subscribe({
        next: (datos:UsuarioValidadoModel) => {          
          console.log(datos);
          this.servicioSeguridad.AlmacenarDatosUsuarioValidado(datos)
          this.router.navigate([""])
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  get obtenerFormGroup(){
    return this.fbGroup.controls;
  }
}
