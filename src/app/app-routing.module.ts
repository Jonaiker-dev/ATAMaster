import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormularioUbicacionComponent } from './components/formulario-ubicacion/formulario-ubicacion.component';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path:'', component:LoginComponent
  },
  {
    path:'main', component:MainComponent
  },
  {
    path:"**", redirectTo:'', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
