import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { firstValueFrom } from 'rxjs';
import { Encabezado, UbicacionRow } from '../interfaces/ExcelType';
import { ApiDriveService } from './Drive/api-drive.service';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private templatePath = 'assets/ATA-Formato.xlsx';
  private supa=inject(ApiDriveService)

  constructor(private http:HttpClient) { }

  async generarExcel(filas: UbicacionRow[], nombre = 'ubicacion_relleno.xlsx') {
    // 1) Cargar la plantilla 
    const buf = await firstValueFrom(
      this.http.get(this.templatePath, { responseType: 'arraybuffer' })
    );

    const workbook = new Workbook();
    await workbook.xlsx.load(buf);

    // Obtener la primera hoja
    const ws = workbook.getWorksheet(1);

  
    const startRow = 5;
    //fecha 
    const date= new Date()
    const mes = new Intl.DateTimeFormat('es-PE', { month: '2-digit' }).format(date);
    const fecha= (date.getDate()+'/'+mes+'/'+date.getFullYear()).toString()
    const fechaRow=ws!.getRow(2)
    fechaRow.getCell(3).value=fecha
    fechaRow.getCell(7).value=sessionStorage.getItem("Nombre")
    fechaRow.commit();

    //Encargado


    // Insertar datos en la tabla
    filas.forEach((f, i) => {
      const row = ws!.getRow(startRow + i);
      row.getCell(1).value = i + 1; // Item
      row.getCell(2).value = f.partidas;
      row.getCell(4).value = f.peso;
      row.getCell(5).value = f.ubicacion;
      row.getCell(6).value = f.tipo_tela;
      row.getCell(7).value = f.rollos;
      row.getCell(8).value = f.observacion;
      row.commit(); // aplica los cambios en la fila
    });

    
    const out = await workbook.xlsx.writeBuffer();

    const file = new File(
      [out],
      nombre,
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
    );
    // const file = new File(
    // [out],
    // 'miReporte.xlsm', 
    // { type: 'application/vnd.ms-excel.sheet.macroEnabled.12' }
    // );

    this.supa.upload(file)
    
  }

   



}
