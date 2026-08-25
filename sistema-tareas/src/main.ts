import { Tarea } from './types';
import { obtenerTareas, guardarTareas } from './storage';

// 1. Cargamos las tareas guardadas al iniciar
let tareas: Tarea[] = obtenerTareas();
let tareaEditandoId: string | null = null;

// 2. Referencias a los elementos de la pantalla (DOM)
const formTarea = document.querySelector<HTMLFormElement>('#form-tarea')!;
const inputTitulo = document.querySelector<HTMLInputElement>('#titulo')!;
const inputDescripcion = document.querySelector<HTMLInputElement>('#descripcion')!;
const selectCategoria = document.querySelector<HTMLSelectElement>('#categoria')!;
const selectPrioridad = document.querySelector<HTMLSelectElement>('#prioridad')!;
const btnGuardar = formTarea.querySelector<HTMLButtonElement>('button[type="submit"]')!;

const inputBuscar = document.querySelector<HTMLInputElement>('#buscar')!;
const selectFiltroEstado = document.querySelector<HTMLSelectElement>('#filtro-estado')!;
const listaTareas = document.querySelector<HTMLUListElement>('#lista-tareas')!;

// 3. Función para dibujar las tareas en pantalla
function renderizarTareas(): void {
  listaTareas.innerHTML = '';

  const textoBusqueda = inputBuscar.value.toLowerCase().trim();
  const filtroEstado = selectFiltroEstado.value;

  // Aplicar filtros y búsqueda
  const tareasFiltradas = tareas.filter((tarea) => {
    const coincideTitulo = tarea.titulo.toLowerCase().includes(textoBusqueda);
    
    let coincideEstado = true;
    if (filtroEstado === 'pendientes') coincideEstado = !tarea.completada;
    if (filtroEstado === 'completadas') coincideEstado = tarea.completada;

    return coincideTitulo && coincideEstado;
  });

  if (tareasFiltradas.length === 0) {
    listaTareas.innerHTML = '<li class="sin-tareas">No hay tareas que coincidan.</li>';
    return;
  }

  // Crear elementos HTML para cada tarea
  tareasFiltradas.forEach((tarea) => {
    const li = document.createElement('li');
    li.className = `tarea-item ${tarea.completada ? 'completada' : ''} prioridad-${tarea.prioridad.toLowerCase()}`;

    li.innerHTML = `
      <div class="tarea-info">
        <h3>${tarea.titulo}</h3>
        <p>${tarea.descripcion}</p>
        <div class="etiquetas">
          <span class="badge categoria">${tarea.categoria}</span>
          <span class="badge prioridad">${tarea.prioridad}</span>
        </div>
      </div>
      <div class="tarea-acciones">
        <button class="btn-check" data-id="${tarea.id}">
          ${tarea.completada ? '↩️ Deshacer' : '✅ Completar'}
        </button>
        <button class="btn-editar" data-id="${tarea.id}">✏️ Editar</button>
        <button class="btn-eliminar" data-id="${tarea.id}">🗑️ Eliminar</button>
      </div>
    `;

    listaTareas.appendChild(li);
  });
}

// 4. Agregar o editar tarea
formTarea.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  const titulo = inputTitulo.value.trim();
  const descripcion = inputDescripcion.value.trim();
  const categoria = selectCategoria.value;
  const prioridad = selectPrioridad.value as 'Baja' | 'Media' | 'Alta';

  if (!titulo || !descripcion) return;

  if (tareaEditandoId) {
    // Modo edición
    tareas = tareas.map((t) =>
      t.id === tareaEditandoId
        ? { ...t, titulo, descripcion, categoria, prioridad }
        : t
    );
    tareaEditandoId = null;
    btnGuardar.textContent = 'Agregar Tarea';
  } else {
    // Modo creación
    const nuevaTarea: Tarea = {
      id: crypto.randomUUID(),
      titulo,
      descripcion,
      categoria,
      prioridad,
      completada: false,
    };
    tareas.push(nuevaTarea);
  }

  guardarTareas(tareas);
  formTarea.reset();
  renderizarTareas();
});

// 5. Escuchar clics en los botones de las tareas (Completar, Editar, Eliminar)
listaTareas.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLElement;
  const id = target.getAttribute('data-id');
  if (!id) return;

  // Cambiar estado (Completada / Pendiente)
  if (target.classList.contains('btn-check')) {
    tareas = tareas.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t));
    guardarTareas(tareas);
    renderizarTareas();
  }

  // Cargar datos para editar
  if (target.classList.contains('btn-editar')) {
    const tarea = tareas.find((t) => t.id === id);
    if (tarea) {
      inputTitulo.value = tarea.titulo;
      inputDescripcion.value = tarea.descripcion;
      selectCategoria.value = tarea.categoria;
      selectPrioridad.value = tarea.prioridad;
      tareaEditandoId = id;
      btnGuardar.textContent = 'Guardar Cambios';
    }
  }

  // Eliminar tarea con confirmación previa
  if (target.classList.contains('btn-eliminar')) {
    const confirmar = confirm('¿Estás seguro de que quieres eliminar esta tarea?');
    if (confirmar) {
      tareas = tareas.filter((t) => t.id !== id);
      guardarTareas(tareas);
      renderizarTareas();
    }
  }
});

// 6. Eventos de filtros y búsqueda en tiempo real
inputBuscar.addEventListener('input', renderizarTareas);
selectFiltroEstado.addEventListener('change', renderizarTareas);

// 7. Renderizado inicial al abrir la app
renderizarTareas();