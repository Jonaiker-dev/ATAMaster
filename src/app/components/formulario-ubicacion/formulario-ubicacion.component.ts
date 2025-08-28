import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartidasService } from '../../services/partidas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-ubicacion',
  templateUrl: './formulario-ubicacion.component.html',
  styleUrl: './formulario-ubicacion.component.css'
})
export class FormularioUbicacionComponent implements OnInit {

 

  FormularioPartidas!:FormGroup;
  
  constructor(private fb:FormBuilder,private ps:PartidasService,private toast:ToastrService ){}

  ngOnInit(): void {
    this.FormularioPartidas=this.fb.group({
      partidas:['',Validators.required],
      peso:[0,Validators.required],
      ubicacion:['',Validators.required],
      tipo_tela:['',Validators.required],
      rollos:[0,Validators.required],
      observacion:[""]
    })
  }

  Guardar(){
    if (this.FormularioPartidas.valid){
      this.ps.addItem(this.FormularioPartidas.value)
      this.FormularioPartidas.reset()
      this.toast.success("Agregado Correctamente",'',{timeOut:1000})
    }else{
      this.toast.error("No se pudo agregar, revisa el formulario","Error")
    }
  }
}
