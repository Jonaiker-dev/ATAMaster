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
  isChecked:boolean=false

  constructor(private fb:FormBuilder,public ps:PartidasService,private toast:ToastrService ){
    
  }

  ngOnInit(): void {
    this.FormularioPartidas=this.fb.group({
      partidas:['',Validators.required],
      peso:[0,Validators.required],
      ubicacion:[''],
      tipo_tela:['',Validators.required],
      rollos:[0,Validators.required],
      observacion:[""]
    })
  }

  Guardar(check:HTMLInputElement){
    if(this.ps.Partidas().length==34){
      setTimeout(()=>{this.toast.warning("LLegaste al Maximo de Registros Permitidos")},1000)
    }
    if (this.FormularioPartidas.valid){
      this.ps.addItem(this.FormularioPartidas.value)
      if(check.checked){
        const ubicado=this.FormularioPartidas.get('ubicacion')!.value
        this.FormularioPartidas.reset()
        this.FormularioPartidas.get('ubicacion')?.setValue(ubicado)
      }else{
        this.FormularioPartidas.reset()

      }
      
      
      this.toast.success("Agregado Correctamente",'',{timeOut:1000})
    }else{
      this.toast.error("No se pudo agregar, revisa el formulario","Error")
    }
  }

  
}
