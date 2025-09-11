import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartidasService } from '../../services/partidas.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  codigo:{codigo:number,nombre:string}|undefined
  User!:string

  ngOnInit(): void {
    this.codigo =this.ps.Trabajadores.find(persona=>persona.codigo.toString()===localStorage.getItem('Encargado')) 
    if(this.codigo){
      this.User=this.codigo.nombre
      localStorage.setItem("Nombre",this.codigo.nombre) 
    }else{
      this.User=localStorage.getItem("Encargado")!
    }
    
  }
  

 constructor(private router:Router,private ps:PartidasService){}
 
 Logout(){
  localStorage.setItem("Partidas","")
  localStorage.setItem("Nombre","")
  this.ps.Partidas.set([])
  this.router.navigate(['/'])
 }

}
