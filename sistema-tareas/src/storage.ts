import { Tarea } from './types';

const CLAVE_STORAGE = 'mis_tareas_v1';

export function obtenerTareas(): Tarea[] {
  const datos = localStorage.getItem(CLAVE_STORAGE);
  return datos ? JSON.parse(datos) : [];
}

export function guardarTareas(tareas: Tarea[]): void {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(tareas));
}