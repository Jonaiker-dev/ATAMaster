import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class ApiDriveService {

  SUPABASE_URL="https://nxkbzbycpiynqofnlwdp.supabase.co";
  SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54a2J6YnljcGl5bnFvZm5sd2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0Mzc4NTEsImV4cCI6MjA3MjAxMzg1MX0.WqYNVV3EZVMFWK9po0WC1OGVPUmqUSmZtPRUkKjuKBg";
  BUCKET="ubicaciones";

  private _client:SupabaseClient

  
  
  constructor() { 
    this._client=createClient(this.SUPABASE_URL,this.SUPABASE_KEY)
  }

  get Client(){
    return this._client
  }

  //Listar Bucket Items
  async list(){
    const {data,error}= await this._client
    .storage
    .from(this.BUCKET)
    .list('', {   
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
      });
    
    if (error) throw error;
    return data;

  }

  // Cargar
  async upload(file: File) {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await this._client
      .storage
      .from(this.BUCKET)
      .upload(fileName, file,{upsert:true});

    if (error) throw error;
    return fileName;
  }

    async downloadFile(fileName: string) {
    const { data, error } = await this._client
      .storage
      .from(this.BUCKET)
      .download(fileName);

    if (error) {
      console.error('Error al descargar archivo:', error.message);
      return null;
    }

      // Crear un enlace para forzar descarga en el navegador
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    return data
  }


  //Borrar

  async remove(fileName: string) {
    const { error } = await this._client
      .storage
      .from(this.BUCKET)
      .remove([fileName]);

    if (error) throw error;
  }

  //PublicURL
  publicUrl(path: string) {
    const { data } = this._client.storage.from(this.BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }


}
