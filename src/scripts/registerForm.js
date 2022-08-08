window.onload = function (event) {
  event.preventDefault();
  let errors = []
  let formulario = document.querySelector('.registerForm')
  let name = document.querySelector('#nombre')

  name.onfocus = function (event) {        
    if (name.value == "") {
      errors.push('El campo esta vacio')
    }
    if (errors.length > 0) {
      event.preventDefault();
      let ulErrors = document.querySelector('.formError ul');
      errors.forEach(error => {
        ulErrors.innerHTML += `<li> ${error} </li>`
      })

    }
  }
}