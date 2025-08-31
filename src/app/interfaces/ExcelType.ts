export interface UbicacionRow {
  partidas?: string;
  peso?: number;
  ubicacion?: string;
  tipo_tela?: string;
  rollos?: number;
  observacion?: string;
}

export interface Encabezado {
  fecha?: Date | string;
  habilitadoPor?: string;
}