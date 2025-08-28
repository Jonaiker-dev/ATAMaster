import { Component, OnInit, signal } from '@angular/core';
import { PartidasService } from '../../services/partidas.service';

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
export class MainComponent  {
  
 constructor(public ps:PartidasService){

 }


  
  
}
