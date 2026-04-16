'use strict';

const nombre = 'David';
const apellido = 'Sisa';
let ciclo = 5;
const activo = true;
const notas = [10, 9, 8, 7];

const direccion = {
    ciudad: 'Cuenca',
    provincia: 'Azuay'
}

console.table({ nombre, apellido, ciclo, activo, direccion });

const esMayorEdad = (edad) => edad >= 18;

const getSaludo = (nombre, hora) => {
    if (hora < 12)
        return `Buenos días, ${nombre}`;
    if (hora < 18)
        return `Buenas tardes, ${nombre}`;
    return `Buenas noches, ${nombre}`;
}

const getSaludo2 = (nombre, hora) => hora < 12
    ? `Buenos días, ${nombre}`
    : hora < 18
        ? `Buenas tardes, ${nombre}`
        : `Buenas noches, ${nombre}`;

console.log(getSaludo(nombre, 10));

// Mostrar en HTML - Corregido nombre de variable
document.getElementById('nombre').textContent = `${nombre}`;
document.getElementById('apellido').textContent = `${apellido}`;
document.getElementById('ciclo').textContent = `${ciclo}`;