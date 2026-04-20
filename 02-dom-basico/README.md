# Práctica 02 - Manipulación del DOM


## 1. Descripción breve 

El proyecto consiste en una aplicación web de gestión de elementos construida únicamente con JavaScript nativo, sin el uso de librerías externas. Cada elemento se representa visualmente como una tarjeta que contiene su título, descripción, categoría, nivel de prioridad y estado actual.

La aplicación ofrece cuatro funcionalidades principales: visualización de los elementos en forma de tarjetas, conteo automático de elementos totales y activos, filtrado por categoría mediante botones interactivos, y eliminación individual de elementos directamente desde la interfaz.

---

## 2. Fragmentos de código 

### 2.1 Renderizado lista

Para construir las tarjetas se emplea `createElement` en combinación con `DocumentFragment`. Este enfoque permite armar toda la estructura en memoria antes de agregarla al DOM, lo que reduce significativamente las actualizaciones visuales innecesarias en el navegador.

```javascript
function renderizarLista(datos) {
    const contenedor = document.querySelector('.contenedor-lista');
    contenedor.innerHTML = '';
    const fragment = document.createDocumentFragment();

    datos.forEach(el => {
        const card = document.createElement('div');
        card.classList.add('card');

        fragment.appendChild(card);
    });

    contenedor.appendChild(fragment);
    actualizarEstadisticas();
}
```

### 2.2 Eliminación de elementos

Cuando el usuario presiona el botón de eliminar, se localiza la posición del elemento dentro del arreglo usando `findIndex`. Si se encuentra, se extrae con `splice` y se vuelve a dibujar la lista con los datos actualizados.

```javascript
function eliminarElemento(id) {
    const index = elementos.findIndex(el => el.id === id);
    if (index !== -1) {
        elementos.splice(index, 1);
        renderizarLista(elementos);
    }
}
```

### 2.3 Filtrado por categoría

Cada botón de filtro almacena su categoría en un atributo `data-categoria`. Al hacer clic, se resalta el botón seleccionado y se genera una nueva lista filtrada con `.filter()` que luego se pasa al renderizador.

```javascript
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
```

### 2.4 Estilos dinámicos 

Las clases CSS se asignan en tiempo de ejecución dependiendo del valor de cada propiedad. Esto permite que los badges cambien de color automáticamente sin necesidad de modificar los estilos directamente desde el código.

```javascript
if (el.prioridad === 'Alta') {
    prioridad.classList.add('prioridad-alta');
} else if (el.prioridad === 'Media') {
    prioridad.classList.add('prioridad-media');
} else {
    prioridad.classList.add('prioridad-baja');
}

estado.classList.add(el.activo ? 'estado-activo' : 'estado-inactivo');
```

### 2.5 Estadísticas 

Cada vez que la lista se vuelve a renderizar, se recalcula automáticamente el conteo de elementos totales y los que se encuentran en estado activo, reflejando siempre el estado actual de los datos.

```javascript
function actualizarEstadisticas() {
    const total = elementos.length;
    const activos = elementos.filter(el => el.activo).length;

    document.getElementById('estadisticas-total').textContent = total;
    document.getElementById('estadisticas-activos').textContent = activos;
}
```

---

## 3. Imágenes de la Aplicación

### Vista general de la aplicación
![Vista General](./assets/general.png)

### Filtrado aplicado
![Filtrado](./assets/filtrado.png)
