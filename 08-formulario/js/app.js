'use strict';

const form = document.querySelector('#form-registro');
const btnEnviar = document.querySelector('#btn-enviar');
const mensajeExito = document.querySelector('#mensaje-exito');
const inputPassword = document.querySelector('#password');
const indicadorFuerza = document.querySelector('#password-strength');
const inputTelefono = document.querySelector('#telefono');

function mostrarMensajeExito(mensaje) {
  mensajeExito.textContent = mensaje;
  mensajeExito.classList.remove('oculto');
  setTimeout(() => {
    mensajeExito.classList.add('oculto');
  }, 4000);
}

function actualizarBotonEnviar() {
  const campos = form.querySelectorAll('[required]');
  const todosLlenos = [...campos].every(c => {
    if (c.type === 'checkbox') return c.checked;
    return c.value.trim() !== '';
  });
  btnEnviar.disabled = !todosLlenos;
}

function autoguardar() {
  const datos = Object.fromEntries(new FormData(form));
  sessionStorage.setItem('form_draft', JSON.stringify(datos));
}

function restaurarBorrador() {
  try {
    const draft = JSON.parse(sessionStorage.getItem('form_draft'));
    if (!draft) return;
    Object.entries(draft).forEach(([name, value]) => {
      const campo = form.querySelector(`[name="${name}"]`);
      if (campo && campo.type !== 'password' && campo.type !== 'checkbox') {
        campo.value = value;
      }
    });
  } catch {
    sessionStorage.removeItem('form_draft');
  }
}

inputPassword.addEventListener('input', () => {
  const fuerza = evaluarFuerzaPassword(inputPassword.value);
  indicadorFuerza.textContent = fuerza.nivel;
  indicadorFuerza.style.color = fuerza.color;
});

inputTelefono.addEventListener('input', (e) => {
  let valor = e.target.value.replace(/\D/g, '');
  if (valor.length > 10) valor = valor.slice(0, 10);

  if (valor.length > 6) {
    valor = `(${valor.slice(0, 3)}) ${valor.slice(3, 6)}-${valor.slice(6)}`;
  } else if (valor.length > 3) {
    valor = `(${valor.slice(0, 3)}) ${valor.slice(3)}`;
  } else if (valor.length > 0) {
    valor = `(${valor}`;
  }

  e.target.value = valor;
});

form.addEventListener('focusout', (e) => {
  if (e.target.matches('input, select, textarea')) {
    validarCampo(e.target);
    actualizarBotonEnviar();
  }
});

form.addEventListener('input', (e) => {
  if (e.target.matches('input, select, textarea')) {
    if (e.target.classList.contains('campo--error')) {
      limpiarError(e.target);
    }
    autoguardar();
    actualizarBotonEnviar();
  }
});

form.addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') {
    validarCampo(e.target);
    actualizarBotonEnviar();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validarFormulario(form)) {
    const primerError = form.querySelector('.campo--error');
    if (primerError) primerError.focus();
    return;
  }

  const datos = Object.fromEntries(new FormData(form));
  delete datos.confirmar_password;
  datos.terminos = form.querySelector('[name="terminos"]').checked;

  console.log('Datos del formulario:', datos);

  mostrarMensajeExito('¡Registro completado correctamente!');
  sessionStorage.removeItem('form_draft');
  form.reset();

  form.querySelectorAll('input, select, textarea').forEach(campo => {
    campo.classList.remove('campo--valido', 'campo--error');
    const errorDiv = campo.parentElement.querySelector('.error-mensaje');
    if (errorDiv) errorDiv.textContent = '';
  });

  indicadorFuerza.textContent = '';
  actualizarBotonEnviar();
});

restaurarBorrador();
actualizarBotonEnviar();