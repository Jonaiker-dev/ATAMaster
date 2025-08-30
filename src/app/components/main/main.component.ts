import { Component, OnInit, signal } from '@angular/core';
import { PartidasService } from '../../services/partidas.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiDriveService } from '../../services/Drive/api-drive.service';

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
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit  {
  
files = signal<{ name: string; url: string }[]>([]);

 constructor(public ps:PartidasService,private supa:ApiDriveService){
  }

  async ngOnInit() {
    await this.refresh()  
    
    
  }

  async refresh() {
    const list = await this.supa.list();
   
    this.files.set(list.map(f => ({
      name: f.name,
      url: this.supa.publicUrl(f.name)
    })));
  }

   async remove(f: { name: string }) {
    await this.supa.remove(f.name);
    await this.refresh();
  }
  
  
}
