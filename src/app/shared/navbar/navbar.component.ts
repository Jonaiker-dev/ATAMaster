import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartidasService } from '../../services/partidas.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  User:string=sessionStorage.getItem("Encargado") || "Edgar Suncion"
 constructor(private router:Router,private ps:PartidasService){
  
 }
 
 Logout(){
  sessionStorage.setItem("Partidas","")
  this.ps.Partidas.set([])
  this.router.navigate(['/'])
 }

}
