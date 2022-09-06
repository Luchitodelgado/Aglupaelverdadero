const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
  name: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios
/*   description: /^[a-zA-ZÀ-ÿ\s]{20,200}$/, // Letras y espacios, pueden llevar acentos. */
  price: /^\d{1,7}$/, // 1 a 9 numeros.(max 9,9 millones)
  discount: /^\d{0,3}$/ // 0 a 3 numeros.(100% amx)
}

const campos = {
  price: false,
  name: false,
  email: false,
  discount: false,
/*   description: false */
}

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "name":
      validarCampo(expresiones.name, e.target, 'name');
      console.log('name')
      break;
    case "price":
      validarCampo(expresiones.price, e.target, 'price');
      break;
/*     case "description":
      validarCampo(expresiones.description, e.target, 'description');
      console.log('campo input')
      break; */
    case "discount":
      validarCampo(expresiones.discount, e.target, 'discount');
      break;
  }
}

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    campos[campo] = true;
  } else {
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    campos[campo] = false;
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const terminos = document.getElementById('terminos');
  if (campos.price && campos.name  && campos.discount /* && campos.description */) {
    formulario.submit();


    document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
    setTimeout(() => {
      document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
    }, 5000);

    document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
      icono.classList.remove('formulario__grupo-correcto');
    });
  } else {
    document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
  }
});
