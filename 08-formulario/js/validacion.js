'use strict';

const REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  telefono: /^\d{10}$/,
  soloLetras: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
};

function mostrarError(campo, mensaje) {
  campo.classList.add('campo--error');
  campo.classList.remove('campo--valido');

  let errorDiv = campo.parentElement.querySelector('.error-mensaje');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'error-mensaje';
    campo.parentElement.appendChild(errorDiv);
  }
  errorDiv.textContent = mensaje;
}

function limpiarError(campo) {
  campo.classList.remove('campo--error');
  campo.classList.add('campo--valido');

  const errorDiv = campo.parentElement.querySelector('.error-mensaje');
  if (errorDiv) errorDiv.textContent = '';
}

function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

function evaluarFuerzaPassword(password) {
  let fuerza = 0;
  if (password.length >= 8) fuerza++;
  if (password.length >= 12) fuerza++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) fuerza++;
  if (/\d/.test(password)) fuerza++;
  if (/[^a-zA-Z0-9]/.test(password)) fuerza++;

  const niveles = ['', 'Muy débil', 'Débil', 'Media', 'Fuerte', 'Muy fuerte'];
  const colores = ['', '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];

  return { nivel: niveles[fuerza] || '', color: colores[fuerza] || '', valor: fuerza };
}

function validarCampo(campo) {
  const valor = campo.value.trim();
  const nombre = campo.name;
  let error = '';

  if (campo.type === 'checkbox') {
    if (!campo.checked) {
      error = 'Debes aceptar los términos y condiciones';
      mostrarError(campo, error);
      return false;
    }
    limpiarError(campo);
    return true;
  }

  if (campo.hasAttribute('required') && !valor) {
    error = 'Este campo es obligatorio';
  }

  if (!error && valor) {
    switch (nombre) {
      case 'nombre':
        if (valor.length < 3) {
          error = 'El nombre debe tener al menos 3 caracteres';
        } else if (!REGEX.soloLetras.test(valor)) {
          error = 'El nombre solo puede contener letras y espacios';
        }
        break;

      case 'email':
        if (!REGEX.email.test(valor)) {
          error = 'Ingresa un correo electrónico válido';
        }
        break;

      case 'telefono':
        if (!REGEX.telefono.test(valor.replace(/\D/g, ''))) {
          error = 'El teléfono debe tener 10 dígitos';
        }
        break;

      case 'fecha_nacimiento':
        if (calcularEdad(valor) < 18) {
          error = 'Debes ser mayor de 18 años';
        }
        break;

      case 'genero':
        if (!valor) {
          error = 'Selecciona un género';
        }
        break;

      case 'password':
        if (valor.length < 8) {
          error = 'La contraseña debe tener al menos 8 caracteres';
        } else if (!/[A-Z]/.test(valor)) {
          error = 'Debe contener al menos una letra mayúscula';
        } else if (!/[a-z]/.test(valor)) {
          error = 'Debe contener al menos una letra minúscula';
        } else if (!/[0-9]/.test(valor)) {
          error = 'Debe contener al menos un número';
        }
        break;

      case 'confirmar_password': {
        const passwordField = document.querySelector('#password');
        if (passwordField && valor !== passwordField.value) {
          error = 'Las contraseñas no coinciden';
        }
        break;
      }
    }
  }

  if (error) {
    mostrarError(campo, error);
    return false;
  }

  limpiarError(campo);
  return true;
}

function validarFormulario(form) {
  const campos = form.querySelectorAll('input, select, textarea');
  let valido = true;
  campos.forEach(campo => {
    if (!validarCampo(campo)) valido = false;
  });
  return valido;
}