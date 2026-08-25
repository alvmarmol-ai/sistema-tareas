export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  prioridad: 'Baja' | 'Media' | 'Alta';
  completada: boolean;
}