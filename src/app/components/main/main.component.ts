import { Component, inject, OnInit, signal } from '@angular/core';
import { PartidasService } from '../../services/partidas.service';

import { ApiDriveService } from '../../services/Drive/api-drive.service';
import { ExcelService } from '../../services/excel.service';
import { ToastrService } from 'ngx-toastr';

interface PartidasData {
  partidas: string;
  peso: number;
  ubicacion: string;
  tipo_tela: string;
  rollos: number;
  observacion?: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  toast = inject(ToastrService);
  excel = inject(ExcelService);
  drive = inject(ApiDriveService);
  files = signal<{ name: string; url: string }[]>([]);

  constructor(public ps: PartidasService, private supa: ApiDriveService) {}

  async ngOnInit() {
    await this.refresh();
    
  }

  async refresh() {
    const list = await this.supa.list();

    this.files.set(
      list.map((f) => ({
        name: f.name,
        url: this.supa.publicUrl(f.name),
      }))
    );
  }

  async ExportarExcel(name: string | null) {
    const filename = document.getElementById('filename') as HTMLInputElement;
    const date= new Date()
    const mes = new Intl.DateTimeFormat('es-PE', { month: '2-digit' }).format(date);
    const fecha= (date.getFullYear()+''+mes+''+date.getDate()).toString()
    //hora
    const hh = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    const ss = date.getSeconds().toString().padStart(2, '0');
    const hora=`${hh}:${min}:${ss}`
    
    if(name){
      let excelfile=await this.excel.generarExcel(this.ps.Partidas(),`${fecha}-${name}-${hora}.xlsx`)
      this.drive.upload(excelfile).then((result)=>{
        console.log(result);
        filename.value=''
        this.toast.info("Guardado Correctamente")
        setTimeout(()=>{this.NuevoExcel()},1000)
      })
      .catch((error)=>{
        this.toast.warning("Error en su conexion, intente de nuevo")
      })
    }else{
      this.toast.error("El documento no tiene nombre")
    }


  }

  NuevoExcel(){
    this.ps.Partidas.set([])
  }

  EliminarRegistro(index:string){
    const copia= this.ps.Partidas()
    const items=[...copia]
    items.splice(parseInt(index)-1,1)
    this.ps.Partidas.set(items)
  }

}
