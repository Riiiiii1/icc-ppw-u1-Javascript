'use strict';

<<<<<<< HEAD
const formPost = document.querySelector('#form-post');
const inputPostId = document.querySelector('#post-id');
const inputTitulo = document.querySelector('#titulo');
const inputContenido = document.querySelector('#contenido');
const btnSubmit = document.querySelector('#btn-submit');
const btnCancelar = document.querySelector('#btn-cancelar');

const inputBuscar = document.querySelector('#input-buscar');
const btnBuscar = document.querySelector('#btn-buscar');
const btnLimpiar = document.querySelector('#btn-limpiar');

const listaPosts = document.querySelector('#lista-posts');
const mensajeEstado = document.querySelector('#mensaje-estado');
const contador = document.querySelector('#contador strong');

let posts = [];
let postsFiltrados = [];
let modoEdicion = false;

async function cargarPosts() {
  try {
    mostrarCargando(listaPosts);

    posts = await ApiService.getPosts(20);
    postsFiltrados = [...posts];

    renderizarPosts(postsFiltrados, listaPosts);
    actualizarContador();

  } catch (error) {
    listaPosts.innerHTML = '';
    listaPosts.appendChild(MensajeError(`No se pudieron cargar los posts: ${error.message}`));
  }
}

function actualizarContador() {
  contador.textContent = postsFiltrados.length;
}

function limpiarFormulario() {
  formPost.reset();
  inputPostId.value = '';
  modoEdicion = false;
  btnSubmit.textContent = 'Crear Post';
  btnCancelar.style.display = 'none';
}

function activarModoEdicion(post) {
  modoEdicion = true;
  inputPostId.value = post.id;
  inputTitulo.value = post.title;
  inputContenido.value = post.body;
  btnSubmit.textContent = 'Actualizar Post';
  btnCancelar.style.display = 'inline-block';

  formPost.scrollIntoView({ behavior: 'smooth', block: 'start' });
  inputTitulo.focus();
}

async function guardarPost(datosPost) {
  try {
    btnSubmit.disabled = true;
    btnSubmit.textContent = modoEdicion ? 'Actualizando...' : 'Creando...';

    let resultado;

    if (modoEdicion) {
      const id = parseInt(inputPostId.value);

      resultado = await ApiService.updatePost(id, datosPost);

      const index = posts.findIndex(p => p.id === id);
      if (index !== -1) {
        posts[index] = { ...resultado, id };
      }

      mostrarMensajeTemporal(
        mensajeEstado,
        MensajeExito(`Post #${id} actualizado correctamente`),
        3000
      );

    } else {
      resultado = await ApiService.createPost(datosPost);

      posts.unshift(resultado);

      mostrarMensajeTemporal(
        mensajeEstado,
        MensajeExito(`Post #${resultado.id} creado correctamente`),
        3000
      );
    }

    postsFiltrados = [...posts];
    renderizarPosts(postsFiltrados, listaPosts);
    actualizarContador();
    limpiarFormulario();

  } catch (error) {
    mostrarMensajeTemporal(
      mensajeEstado,
      MensajeError(`Error al guardar: ${error.message}`),
      5000
    );
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.textContent = modoEdicion ? 'Actualizar Post' : 'Crear Post';
  }
}

async function eliminarPost(id) {
  if (!confirm(`¿Eliminar el post #${id}?`)) {
    return;
  }

  try {
    await ApiService.deletePost(id);

    posts = posts.filter(p => p.id !== id);
    postsFiltrados = postsFiltrados.filter(p => p.id !== id);

    renderizarPosts(postsFiltrados, listaPosts);
    actualizarContador();

    mostrarMensajeTemporal(
      mensajeEstado,
      MensajeExito(`Post #${id} eliminado correctamente`),
      3000
    );

  } catch (error) {
    mostrarMensajeTemporal(
      mensajeEstado,
      MensajeError(`Error al eliminar: ${error.message}`),
      5000
    );
  }
}

function buscarPosts(termino) {
  const terminoLower = termino.toLowerCase().trim();

  if (terminoLower === '') {
    postsFiltrados = [...posts];
  } else {
    postsFiltrados = posts.filter(post => {
      const tituloMatch = post.title.toLowerCase().includes(terminoLower);
      const bodyMatch = post.body.toLowerCase().includes(terminoLower);
      return tituloMatch || bodyMatch;
    });
  }

  renderizarPosts(postsFiltrados, listaPosts);
  actualizarContador();
}

function limpiarBusqueda() {
  inputBuscar.value = '';
  postsFiltrados = [...posts];
  renderizarPosts(postsFiltrados, listaPosts);
  actualizarContador();
}

formPost.addEventListener('submit', (e) => {
  e.preventDefault();

  const datosPost = {
    title: inputTitulo.value.trim(),
    body: inputContenido.value.trim(),
    userId: 1
  };

  guardarPost(datosPost);
});

btnCancelar.addEventListener('click', () => {
  limpiarFormulario();
});

btnBuscar.addEventListener('click', () => {
  buscarPosts(inputBuscar.value);
});

inputBuscar.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    buscarPosts(inputBuscar.value);
  }
});

btnLimpiar.addEventListener('click', () => {
  limpiarBusqueda();
});

listaPosts.addEventListener('click', (e) => {
  const action = e.target.dataset.action;

  if (!action) return;

  const id = parseInt(e.target.dataset.id);
  const post = posts.find(p => p.id === id);

  if (action === 'editar' && post) {
    activarModoEdicion(post);
  }

  if (action === 'eliminar') {
    eliminarPost(id);
  }
});

cargarPosts();
=======
/* =========================
   1. SELECTORES DEL DOM
========================= */

// Botón que dispara la petición
const btn = document.querySelector('#btn-cargar');

// Contenedor donde se van a renderizar las cards
const contenedor = document.querySelector('#contenedor');

// Elemento visual de carga
const loading = document.querySelector('#loading');

// Endpoint (API pública de Simpsons)
const URL = 'https://thesimpsonsapi.com/api/characters';



/* =========================
   2. EVENTO
========================= */

// Escuchamos el evento "click" del botón
// Cuando el usuario hace click, se ejecuta la función cargarDatos
btn.addEventListener('click', cargarDatos);


/* =========================
   3. FETCH (GET)
========================= */

// Se declara como async porque vamos a usar await dentro
// async permite trabajar con promesas de forma secuencial
async function cargarDatos() {
  try {
    // Mostrar el loading (quitamos la clase que lo oculta)
    // classList.remove elimina la clase CSS "oculto"
    loading.classList.remove('oculto');

    // Limpiar contenido previo
    contenedor.innerHTML = '';

    // Petición HTTP GET
    // fetch devuelve una Promise con la respuesta del servidor
    const response = await fetch(URL);

    // fetch NO lanza error en 404 o 500
    // por eso se valida manualmente con response.ok
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Convertir la respuesta a JSON
    // también retorna una Promise → se usa await
    const data = await response.json();

    // IMPORTANTE: la lista está en data.results
    renderizar(data.results);


  } catch (error) {
    // Captura errores:
    // - errores de red
    // - errores manuales (throw)
    mostrarError(error.message);

  } finally {
    // Este bloque SIEMPRE se ejecuta
    // haya error o no
    // Se usa para limpiar estado (ocultar loading)
    loading.classList.add('oculto');
  }
}


/* =========================
   4. RENDERIZADO
========================= */

// Construye dinámicamente el HTML con createElement
// NO usa innerHTML → evita problemas de seguridad
function renderizar(lista) {

  // Recorremos cada elemento de la API
  lista.forEach(item => {

    // Crear contenedor de card
    const card = document.createElement('div');
    card.className = 'card';

       // La API devuelve ruta relativa → hay que completar la URL
    const bloqueImagen = document.createElement('div');
    bloqueImagen.className = 'card-imagen';
    const img = document.createElement('img');
    img.src = `https://cdn.thesimpsonsapi.com/500${item.portrait_path}`;
    img.alt = item.name;
    img.width = 100;

    
    bloqueImagen.appendChild(img);

    const bloqueTexto = document.createElement('div');
    bloqueTexto.className = 'card-contenido';

    const nombre = document.createElement('h3');
    nombre.textContent = item.name;

    const ocupacion = document.createElement('p');
    ocupacion.textContent = item.occupation || 'Sin ocupación';

    bloqueTexto.appendChild(nombre);
    bloqueTexto.appendChild(ocupacion);

    card.appendChild(bloqueImagen);
    card.appendChild(bloqueTexto);


    // Insertar en el DOM
    contenedor.appendChild(card);
  });
}


/* =========================
   5. MANEJO DE ERRORES
========================= */

// Muestra un mensaje en pantalla si algo falla
function mostrarError(mensaje) {
  const p = document.createElement('p');
  p.textContent = mensaje;
  p.style.color = 'red';

  contenedor.appendChild(p);
}
>>>>>>> e5ee93875a3e26bb70428528d8d8ae29732359a5
