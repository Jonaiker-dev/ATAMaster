import { Component, OnInit } from '@angular/core';
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
  files!:StorageItems[]
 

  constructor(private drive:ApiDriveService){}

  async ngOnInit():Promise<void> {
    this.data=await this.drive.list()
    this.files=this.data
    
  }

}
