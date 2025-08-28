import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {
  storageKey:string="Partidas"

  Partidas=signal<any[]>(this.loadFromStorage())
  
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
