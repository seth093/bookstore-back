# Bookstore Frontend

Este proyecto corresponde al frontend de una aplicación de gestión de autores.
La aplicación permite **crear autores**, validar datos en el formulario y ejecutar **pruebas automatizadas con Jest y React Testing Library**.

---

# Guía de ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd bookstore-front
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará todas las librerías necesarias del proyecto, incluyendo:

* Next.js
* React
* Jest
* React Testing Library

### 3. Ejecutar la aplicación

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:3000
```

### 4. Ejecutar las pruebas

Para ejecutar la suite de pruebas automatizadas:

```bash
npm test
```

Esto ejecutará los tests definidos con **Jest** y **React Testing Library**, los cuales verifican:

* Renderizado del formulario
* Validación del nombre
* Validación de la descripción
* Estado habilitado/deshabilitado del botón
* Comportamiento del formulario cuando los datos son válidos

---

# Reporte de Cambios

Para asegurar la persistencia de los datos entre rutas, se utilizó un enfoque basado en el manejo del estado y la comunicación con el backend mediante llamadas HTTP utilizando `fetch`. Los datos de los autores se obtienen desde la API y se reutilizan entre las diferentes páginas del sistema, permitiendo que la información creada o modificada se mantenga disponible al navegar entre rutas.

Adicionalmente, se integró una lógica de filtrado en el listado de autores. Esta lógica permite aplicar condiciones de búsqueda sobre los datos obtenidos de la API, procesándolos en el frontend antes de renderizarlos. De esta forma se mejora la experiencia del usuario al permitir localizar autores específicos de manera rápida sin necesidad de realizar múltiples solicitudes al servidor.

---
