# 📋 Sistema de Gestión de Tareas (Task Management App)

¡Bienvenido al **Sistema de Gestión de Tareas**! Esta es una aplicación web interactiva, moderna y responsive construida con **TypeScript Vanilla** y **Vite**. Permite a los usuarios organizar sus actividades diarias de manera eficiente, clasificándolas por categorías y niveles de prioridad, manteniendo la información guardada localmente en el navegador.

---

## 🚀 Características Principales

* **Gestión completa de tareas (CRUD):**
  * **Crear:** Agrega nuevas tareas especificando título, descripción, categoría (Escuela, Hogar, Juego) y prioridad (Baja, Media, Alta).
  * **Editar:** Modifica la información de tareas previamente creadas en tiempo real.
  * **Completar:** Marca y desmarca tareas completadas de forma visual.
  * **Eliminar:** Elimina tareas con un mensaje de confirmación previa para evitar borrados accidentales.
* **Filtros y Búsqueda en tiempo real:**
  * Búsqueda dinámica de tareas por título mediante barra de texto.
  * Filtrado por estado: *Todas*, *Pendientes* o *Completadas*.
* **Persistencia de Datos (localStorage):**
  * Guardado automático de tareas en la memoria local del navegador.
  * Mantiene los datos intactos incluso si la pestaña o el navegador se cierran.
* **Diseño Moderno y Responsive:**
  * Tarjetas de tareas con identificación visual según el nivel de prioridad (colores verde, amarillo y rojo).
  * Adaptado para una experiencia fluida en dispositivos móviles, tabletas y computadoras de escritorio.

---

## 🛠️ Tecnologías Utilizadas

* **TypeScript:** Lenguaje tipado para una lógica clara, robusta y libre de errores.
* **Vite:** Bundler y servidor de desarrollo ultra rápido.
* **HTML5 & CSS3 Puro:** Estructura semántica y diseño moderno utilizando Flexbox, CSS Grid y variables de CSS.
* **localStorage API:** Almacenamiento web persistente.
* **Git & GitHub:** Control de versiones y publicación del proyecto.

---

## 📂 Estructura del Proyecto

```text
sistema-tareas/
├── index.html          # Estructura principal de la aplicación
├── package.json        # Configuración de dependencias y scripts de Node.js
├── tsconfig.json       # Configuración de TypeScript
├── src/
│   ├── main.ts         # Control del DOM, eventos, filtros y lógica principal
│   ├── storage.ts      # Manejo del localStorage (leer y guardar datos)
│   ├── types.ts        # Interfaces y definiciones de tipos de datos
│   └── style.css       # Estilos globales, variables de color y diseño responsive
└── README.md           # Documentación del proyecto