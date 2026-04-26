'use strict';

function PostCard(post) {
  const article = document.createElement('article');
  article.className = 'post-card fade-in';
  article.dataset.id = post.id;

  const header = document.createElement('div');
  header.className = 'post-card-header';

  const title = document.createElement('h3');
  title.className = 'post-card-title';
  title.textContent = post.title;

  const badge = document.createElement('span');
  badge.className = 'post-card-id';
  badge.textContent = `#${post.id}`;

  header.appendChild(title);
  header.appendChild(badge);

  const body = document.createElement('p');
  body.className = 'post-card-body';
  body.textContent = post.body;

  const footer = document.createElement('div');
  footer.className = 'post-card-footer';

  const btnEditar = document.createElement('button');
  btnEditar.className = 'btn-editar';
  btnEditar.textContent = 'Editar';
  btnEditar.dataset.action = 'editar';
  btnEditar.dataset.id = post.id;

  const btnEliminar = document.createElement('button');
  btnEliminar.className = 'btn-eliminar';
  btnEliminar.textContent = 'Eliminar';
  btnEliminar.dataset.action = 'eliminar';
  btnEliminar.dataset.id = post.id;

  footer.appendChild(btnEditar);
  footer.appendChild(btnEliminar);

  article.appendChild(header);
  article.appendChild(body);
  article.appendChild(footer);

  return article;
}

function Spinner() {
  const container = document.createElement('div');
  container.className = 'loading';

  const spinner = document.createElement('div');
  spinner.className = 'spinner';

  const texto = document.createElement('p');
  texto.textContent = 'Cargando posts...';

  container.appendChild(spinner);
  container.appendChild(texto);

  return container;
}

function MensajeError(mensaje) {
  const container = document.createElement('div');
  container.className = 'error';

  const titulo = document.createElement('strong');
  titulo.textContent = 'Error';

  const texto = document.createElement('p');
  texto.textContent = mensaje;

  container.appendChild(titulo);
  container.appendChild(texto);

  return container;
}

function MensajeExito(mensaje) {
  const container = document.createElement('div');
  container.className = 'success';

  const texto = document.createElement('p');
  texto.textContent = mensaje;

  container.appendChild(texto);

  return container;
}

function EstadoVacio() {
  const container = document.createElement('div');
  container.className = 'estado-vacio';

  const texto = document.createElement('p');
  texto.textContent = 'No hay posts para mostrar';

  container.appendChild(texto);

  return container;
}

function renderizarPosts(posts, contenedor) {
  contenedor.innerHTML = '';

  if (posts.length === 0) {
    contenedor.appendChild(EstadoVacio());
    return;
  }

  posts.forEach(post => {
    const postElement = PostCard(post);
    contenedor.appendChild(postElement);
  });
}

function mostrarCargando(contenedor) {
  contenedor.innerHTML = '';
  contenedor.appendChild(Spinner());
}

function mostrarMensajeTemporal(contenedor, elemento, duracion = 3000) {
  contenedor.innerHTML = '';
  contenedor.appendChild(elemento);
  contenedor.classList.remove('oculto');

  if (duracion > 0) {
    setTimeout(() => {
      contenedor.classList.add('oculto');
    }, duracion);
  }
}