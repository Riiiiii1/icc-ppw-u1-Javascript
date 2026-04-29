'use strict'

// clave con la cual se guarda en localStorage
const STORAGE_KEY = 'tareas';

// elementos del DOM
const input = document.querySelector("#input-tarea");
const btnAdd = document.querySelector("#btn-agregar");
const lista = document.querySelector("#lista-tareas");
const btnLimpiar = document.querySelector("#btn-limpiar");

// variable de memoria del listado
let tareas = [];

// cargar desde localStorage
function cargarDelStorage() {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
}

// guardar en localStorage
function guardarTareas() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
}

// agregar tarea
function agregarTarea(texto) {
    if (!texto.trim()) return;

    const nuevaTarea = {
        id: Date.now(),
        texto: texto.trim(),
        completada: false
    };

    tareas.push(nuevaTarea);
    guardarTareas();
    renderizar();
    input.value = '';
}

// eliminar tarea
function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    guardarTareas();
    renderizar();
}

// completar tarea
function toggleTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
    }
    
    guardarTareas();
    renderizar();
}

// limpiar todo
function limpiarTodo() {
    if (tareas.length === 0) return;

    if (confirm('¿Estás seguro?')) {
        tareas = [];
        guardarTareas();
        renderizar();
    }
}

// renderizar
function renderizar() {
    lista.innerHTML = '';

    if (tareas.length === 0) {
        const vacio = document.createElement('p');
        vacio.className = 'vacio';
        vacio.textContent = 'No hay tareas. ¡Agrega una!';
        lista.appendChild(vacio);
        btnLimpiar.disabled = true;
        return;
    }

    btnLimpiar.disabled = false;

    tareas.forEach(tarea => {
        const item = document.createElement('div');
        item.className = 'item-tarea';

        if (tarea.completada) {
            item.classList.add('completada');
        }

        const texto = document.createElement('span');
        texto.className = 'texto-tarea';
        texto.textContent = tarea.texto;
        texto.addEventListener('click', () => toggleTarea(tarea.id));

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn-eliminar';
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));

        item.appendChild(texto);
        item.appendChild(btnEliminar);
        lista.appendChild(item);
    });
}

// eventos
btnAdd.addEventListener('click', () => {
    agregarTarea(input.value);
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        agregarTarea(input.value);
    }
});

btnLimpiar.addEventListener('click', limpiarTodo);

// inicializar
tareas = cargarDelStorage();
renderizar();
input.focus();