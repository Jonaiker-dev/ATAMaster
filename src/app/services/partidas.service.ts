import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {
  storageKey:string="Partidas"

  Partidas=signal<any[]>(this.loadFromStorage())
  
  Trabajadores=
  [
  {
    "codigo": 32669,
    "nombre": "PUMA NAYELI"
  },
  {
    "codigo": 30059,
    "nombre": "VASQUEZ  ANTHONI"
  },
  {
    "codigo": 32507,
    "nombre": "OCAMPO PEDRO"
  },
  {
    "codigo": 31872,
    "nombre": "VASQUEZ LUIS"
  },
  {
    "codigo": 33941,
    "nombre": "RONCEROS JORGE"
  },
  {
    "codigo": 34029,
    "nombre": "SUNCION EDGAR"
  },
  {
    "codigo": 34084,
    "nombre": "PACHAS JUAN CARLOS"
  },
  
  {
    "codigo": 33704,
    "nombre": "LEVANO LUIS"
  },
  {
    "codigo": 32878,
    "nombre": "CARDENAS SAUL"
  },
  {
    "codigo": 29847,
    "nombre": "GARCIA  CARLOS"
  },
  {
    "codigo": 33877,
    "nombre": "QUISPE  BENJAMIN"
  },
  {
    "codigo": 33756,
    "nombre": "MARCOS  ERICK"
  },
  {
    "codigo": 30255,
    "nombre": "TASAYCO CARLOS"
  },
  {
    "codigo": 72484998,
    "nombre": "SERV. DIAZ HANSEL"
  }
]


  constructor() {
    effect(()=>{
      sessionStorage.setItem(this.storageKey, JSON.stringify(this.Partidas()))
    });

   }

  private loadFromStorage(): any[] {
    const data = sessionStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addItem(items:any){
    this.Partidas.set([...this.Partidas(),items])
  }
}
