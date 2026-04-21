# Práctica 03 - Eventos y Formularios

## Información del Estudiante


## 1. Descripción breve de la solución

La práctica está compuesta por dos módulos independientes desarrollados con JavaScript nativo. El primero es un formulario de contacto con validación en tiempo real, que verifica cada campo al perder el foco y muestra mensajes de error personalizados sin recargar la página. El segundo es un gestor de tareas que permite agregar, completar y eliminar elementos mediante event delegation, evitando la necesidad de registrar listeners individuales por cada tarea.

Ambos módulos comparten el enfoque de manipulación dinámica del DOM y manejo de eventos del navegador, incluyendo un atajo de teclado con Ctrl+Enter para enviar el formulario.

---

## 2. Fragmentos de código relevantes

### 2.1 Validación del formulario con `preventDefault`

Al enviar el formulario se cancela el comportamiento por defecto del navegador con `preventDefault`, se ejecutan todas las validaciones y solo si todas pasan se muestran los resultados y se limpia el formulario.

```javascript
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombreValido = validarNombre();
  const emailValido = validarEmail();
  const asuntoValido = validarAsunto();
  const mensajeValido = validarMensaje();

  if (nombreValido && emailValido && asuntoValido && mensajeValido) {
    mostrarResultado();
    resetearFormulario();
    return;
  }

  if (!nombreValido) { inputNombre.focus(); return; }
  if (!emailValido)  { inputEmail.focus();  return; }
  if (!asuntoValido) { selectAsunto.focus(); return; }
  textMensaje.focus();
});
```

### 2.2 Función genérica de validación por campo

Se reutiliza una sola función para validar cualquier campo del formulario. Recibe el elemento, una condición booleana y el id del mensaje de error, y aplica o quita las clases correspondientes según el resultado.

```javascript
function validarCampo(input, esValido, errorId) {
  const errorMsg = document.getElementById(errorId);

  if (esValido) {
    input.classList.remove('error');
    errorMsg.classList.remove('visible');
  } else {
    input.classList.add('error');
    errorMsg.classList.add('visible');
  }

  return esValido;
}
```

### 2.3 Atajo de teclado con Ctrl+Enter

Se escucha el evento `keydown` a nivel de documento. Si se detecta la combinación Ctrl+Enter, se solicita el envío del formulario mediante `requestSubmit`, que dispara las validaciones normales.

```javascript
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    e.preventDefault();
    formulario.requestSubmit();
  }
});
```

### 2.4 Event delegation en la lista de tareas

En lugar de asignar un listener por cada botón o texto, se registra un único listener en el contenedor padre. Dependiendo del atributo `data-action` del elemento clickeado, se determina si la acción es eliminar o marcar como completada.

```javascript
listaTareas.addEventListener('click', (e) => {
  const action = e.target.dataset.action;
  if (!action) return;

  const item = e.target.closest('li');
  if (!item || !item.dataset.id) return;

  const id = Number(item.dataset.id);

  if (action === 'eliminar') {
    tareas = tareas.filter((tarea) => tarea.id !== id);
    renderizarTareas();
    return;
  }

  if (action === 'toggle') {
    const tarea = tareas.find((itemTarea) => itemTarea.id === id);
    if (tarea) {
      tarea.completada = !tarea.completada;
      renderizarTareas();
    }
  }
});
```

### 2.5 Contador de tareas actualizado

Cada vez que se renderiza la lista, se recalcula el número de tareas pendientes filtrando las que aún no han sido completadas.

```javascript
function actualizarContadorTareas() {
  const pendientes = tareas.filter((tarea) => !tarea.completada).length;
  contadorTareas.textContent = `${pendientes} pendientes`;
}
```

---

## 3. Capturas de la Aplicación

### Validación en acción
![Validación](./assets/01-validacion.jpg)

### Formulario procesado
![Formulario](./assets/02-formulario.jpg)

### Event delegation funcionando
![Agregar tareas](./assets/03-agregar-tareas.jpg)

### Contador de tareas actualizado
![Delegación](./assets/04-delgacion.jpg)

### Tareas completadas
![Eliminar](./assets/05-eliminar.jpg)