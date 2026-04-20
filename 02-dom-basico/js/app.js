"use strict"
const estudiante = {
    nombre: 'David Esteban Sisa Buestan',
    carrera: 'Ingenieria en Sistemas',
    semestre: '5'
}

const elementos = [
  { id: 1, titulo: 'Proyecto Web', descripcion: 'Terminar práctica JS', categoria: 'Estudio', prioridad: 'Alta', activo: true },
  { id: 2, titulo: 'Comprar comida', descripcion: 'Ir al supermercado', categoria: 'Personal', prioridad: 'Media', activo: true },
  { id: 3, titulo: 'Reunión', descripcion: 'Equipo de trabajo', categoria: 'Trabajo', prioridad: 'Alta', activo: false },
  { id: 4, titulo: 'Leer libro', descripcion: 'Capítulo de JS', categoria: 'Estudio', prioridad: 'Baja', activo: true },
  { id: 5, titulo: 'Ejercicio', descripcion: 'Salir a correr', categoria: 'Personal', prioridad: 'Media', activo: false },
  { id: 6, titulo: 'Deploy', descripcion: 'Subir proyecto', categoria: 'Trabajo', prioridad: 'Alta', activo: true }
];

function mostrarInfoEstudiante (){
    const nombre = document.getElementById('estudiante-nombre');
    nombre.textContent = estudiante.nombre;
    //Otra forma de hacerlo
    document.getElementById('estudiante-carrera').textContent = estudiante.carrera;
    document.getElementById('estudiante-semestre').textContent = `${estudiante.semestre}° semestre`;
}



function renderizarLista(datos) {
    
    const contenedor = document.querySelector('.contenedor-lista');
    contenedor.innerHTML = '';

    const fragment = document.createDocumentFragment();

    datos.forEach(el => {

    const card = document.createElement('div');
    card.classList.add('card');

    const titulo = document.createElement('h3');
    titulo.textContent = el.titulo;

    const descripcion = document.createElement('p');
    descripcion.textContent = el.descripcion;

    const categoria = document.createElement('span');
    categoria.textContent = el.categoria;
    // Agregar clases css badge-categoria
    categoria.classList.add('badge', 'badge-categoria');

    const prioridad = document.createElement('span');
    prioridad.textContent = el.prioridad;
    prioridad.classList.add('badge');



    // Agregar una clase segun la prioridad..... quiza para agregar un color distinto
    if (el.prioridad === 'Alta') {
        prioridad.classList.add('prioridad-alta');
    } else if (el.prioridad === 'Media') {
        prioridad.classList.add('prioridad-media');
    } else {
        prioridad.classList.add('prioridad-baja');
    }

    const estado = document.createElement('span');
    estado.textContent = el.activo ? 'Activo' : 'Inactivo';
    estado.classList.add('badge');
    estado.classList.add(
        // Condicion donde si es verdadera, cambia a una clase distinta.....CS Dinamico
        el.activo ? 'estado-activo' : 'estado-inactivo'
    );


    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.classList.add('btn-eliminar');

    btnEliminar.addEventListener('click', () => {
        eliminarElemento(el.id);
    });
    // Cargar contenido en el contenedor de card
    card.appendChild(titulo);
    card.appendChild(descripcion);


    const badges = document.createElement('div');
    badges.classList.add('badges');
    // Cargar contenido en el contenedor badges
    badges.appendChild(categoria);
    badges.appendChild(prioridad);
    badges.appendChild(estado);
    // Cargar contenido en el contenedor de acciones
    const acciones = document.createElement('div');
    acciones.classList.add('card-actions');
    acciones.appendChild(btnEliminar);
    // Cargar las etiquetas hijas ya que dentro de card esta badges y luego acciones
    //card.appendChild(titulo);
    //card.appendChild(descripcion);
    card.appendChild(badges);
    card.appendChild(acciones);
    // Cargar el fragment temporal con el card
    fragment.appendChild(card);
    });
    // Cargar el fragment en el contenedor padre contenedor ya creado en el html
    contenedor.appendChild(fragment);
    actualizarEstadisticas();
}


function eliminarElemento(id) {
  const index = elementos.findIndex(el => el.id === id);
  if (index !== -1) {
    elementos.splice(index, 1);
    renderizarLista(elementos);
  }
}

function actualizarEstadisticas() {
  const total = elementos.length;
  const activos = elementos.filter(el => el.activo).length;
  
  document.getElementById('estadisticas-total').textContent = total;
  document.getElementById('estadisticas-activos').textContent = activos;
}

function inicializarFiltros() {
  const botones = document.querySelectorAll('.btn-filtro');

  botones.forEach(btn => {
    btn.addEventListener('click', () => {

      const categoria = btn.dataset.categoria;

      document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('btn-filtro-activo'));
      btn.classList.add('btn-filtro-activo');

      if (categoria === 'todas') {
        renderizarLista(elementos);
      } else {
        const filtrados = elementos.filter(e => e.categoria === categoria);
        renderizarLista(filtrados);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarInfoEstudiante();
  renderizarLista(elementos);
  inicializarFiltros();
});