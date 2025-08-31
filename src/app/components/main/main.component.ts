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
  files = signal<{ name: string; url: string }[]>([]);

  constructor(public ps: PartidasService, private supa: ApiDriveService) {}

  async ngOnInit() {
    await this.refresh();
    console.log(this.ps.Partidas());
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
    console.log(hora);
    if(name){
      await this.excel.generarExcel(this.ps.Partidas(),`${fecha}-${name}-${hora}.xlsx`)
      filename.value=''
      this.toast.info("Guardado Correctamente")
    }else{
      this.toast.error("El documento no tiene nombre")
    }

    
  }
}
