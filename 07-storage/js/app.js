'use strict';

const formTarea = document.getElementById('form-tarea');
const inputTarea = document.getElementById('input-tarea');
const listaTareas = document.getElementById('lista-tareas');
const mensajeEstado = document.getElementById('mensaje-estado');
const btnLimpiar = document.getElementById('btn-limpiar');
const themeBtns = document.querySelectorAll('[data-theme]');

let tareas = [];

function crearElementoTarea(tarea) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.dataset.id = tarea.id;

  if (tarea.completada) {
    li.classList.add('task-item--completed');
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-item__checkbox';
  checkbox.checked = tarea.completada;

  const span = document.createElement('span');
  span.className = 'task-item__text';
  span.textContent = tarea.texto;

  const btnEliminar = document.createElement('button');
  btnEliminar.className = 'btn btn--danger btn--small';
  btnEliminar.textContent = '🗑️';

  const divAcciones = document.createElement('div');
  divAcciones.className = 'task-item__actions';
  divAcciones.appendChild(btnEliminar);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(divAcciones);

  checkbox.addEventListener('change', () => toggleTarea(tarea.id));
  btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));

  return li;
}

function renderizarTareas() {
  listaTareas.innerHTML = '';

  if (tareas.length === 0) {
    const divVacio = document.createElement('div');
    divVacio.className = 'empty-state';
    const p = document.createElement('p');
    p.textContent = '🎉 No hay tareas. ¡Agrega una para comenzar!';
    divVacio.appendChild(p);
    listaTareas.appendChild(divVacio);
    return;
  }

  tareas.forEach(tarea => {
    const elemento = crearElementoTarea(tarea);
    listaTareas.appendChild(elemento);
  });
}

function mostrarMensaje(texto, tipo = 'success') {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = `mensaje mensaje--${tipo}`;
  mensajeEstado.classList.remove('oculto');

  setTimeout(() => {
    mensajeEstado.classList.add('oculto');
  }, 3000);
}

function cargarTareas() {
  tareas = TareaStorage.getAll();
  renderizarTareas();
}

function agregarTarea(texto) {
  if (!texto.trim()) {
    mostrarMensaje('El texto no puede estar vacío', 'error');
    return;
  }

  const nueva = TareaStorage.crear(texto);
  tareas = TareaStorage.getAll();
  renderizarTareas();
  mostrarMensaje(`✓ Tarea "${nueva.texto}" agregada`);
}

function toggleTarea(id) {
  TareaStorage.toggleCompletada(id);
  tareas = TareaStorage.getAll();
  renderizarTareas();
}

function eliminarTarea(id) {
  const tarea = tareas.find(t => t.id === id);
  if (!confirm(`¿Eliminar "${tarea.texto}"?`)) return;

  TareaStorage.eliminar(id);
  tareas = TareaStorage.getAll();
  renderizarTareas();
  mostrarMensaje(`🗑️ Tarea eliminada`);
}

function limpiarTodo() {
  if (tareas.length === 0) {
    mostrarMensaje('No hay tareas para limpiar', 'error');
    return;
  }

  if (!confirm('¿Eliminar todas las tareas?')) return;

  TareaStorage.limpiarTodo();
  tareas = [];
  renderizarTareas();
  mostrarMensaje('🧹 Todas las tareas eliminadas');
}

function aplicarTema(nombreTema) {
  if (nombreTema === 'oscuro') {
    document.documentElement.style.setProperty('--bg-primary', '#1a1a2e');
    document.documentElement.style.setProperty('--bg-secondary', '#16213e');
    document.documentElement.style.setProperty('--card-bg', '#0f3460');
    document.documentElement.style.setProperty('--text-primary', '#e0e0e0');
    document.documentElement.style.setProperty('--text-secondary', '#a0a0a0');
    document.documentElement.style.setProperty('--border-color', '#2a2a4a');
  } else {
    document.documentElement.style.setProperty('--bg-primary', '#f5f7fa');
    document.documentElement.style.setProperty('--bg-secondary', '#ffffff');
    document.documentElement.style.setProperty('--card-bg', '#ffffff');
    document.documentElement.style.setProperty('--text-primary', '#2d3436');
    document.documentElement.style.setProperty('--text-secondary', '#636e72');
    document.documentElement.style.setProperty('--border-color', '#e0e0e0');
  }

  themeBtns.forEach(btn => {
    btn.classList.toggle('theme-btn--active', btn.dataset.theme === nombreTema);
  });

  TemaStorage.setTema(nombreTema);
}

formTarea.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = inputTarea.value.trim();
  agregarTarea(texto);
  inputTarea.value = '';
});

btnLimpiar.addEventListener('click', limpiarTodo);

themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    aplicarTema(btn.dataset.theme);
  });
});

const temaGuardado = TemaStorage.getTema();
aplicarTema(temaGuardado);

cargarTareas();

if (tareas.length === 0) {
  mostrarMensaje('👋 Bienvenido! Agrega tu primera tarea', 'success');
}