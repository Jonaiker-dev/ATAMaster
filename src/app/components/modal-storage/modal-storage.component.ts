import { Component, OnInit, signal } from '@angular/core';
import { ApiDriveService } from '../../services/Drive/api-drive.service';
import { StorageItems } from '../../interfaces/StorageItems';

@Component({
  selector: 'app-modal-storage',
  templateUrl: './modal-storage.component.html',
  styleUrl: './modal-storage.component.css'
})
export class ModalStorageComponent implements OnInit {

  Encargado=sessionStorage.getItem("Encargado")
  data:any
  files=signal<StorageItems[]>([])
 

  constructor(private drive:ApiDriveService){}

  async ngOnInit():Promise<void> {
    await this.Recargar()
  }

  async Recargar(){
    this.data=await this.drive.list()
    this.files.set(this.data)
  }

  async BorrarArchivo(name:string|null){
   
    try{
      if(name != null){
        await this.drive.remove(name)
        
      }
      await this.Recargar()
    }catch(error){
      console.log(error);
    }
  }

 

  async Descargar(filename:string|null){
    if(filename){
      this.drive.downloadFile(filename)
    }
  }

}
