window.onload = function (event) {
    event.preventDefault();
    let errors = []
    let formulario = document.querySelector('.registerForm')
    let name = document.querySelector('#nombre')
    let apellido = document.querySelector('#apellido')
    let email = document.querySelector('#createEmail')

    name.onfocus = function (event) {
      event.preventDefault();
      if (name.value.length == 0) {
        errors.push("Debes completar este campo")
      };
      if (name.value.length < 2 && name.value.length != 0) {
        errors.push('Debe tener 2 caracteres o mas')
      }
      if (name.value.length > 20) {
        errors.push('Tu nombre es muy largo')
      }
      if (errors.length > 0) {
        event.preventDefault();
        let ulErrors = document.querySelector('.formError ul');
        errors.forEach(error => {
          ulErrors.innerHTML += `<li> ${error} </li>`
        })
      }

    };

    apellido.onfocus = function (event) {
      event.preventDefault();
      if (apellido.value.length == 0) {
        errors.push("Debes completar este campo")
      };
      if (apellido.value.length < 2 && apellido.value.length != 0) {
        errors.push('Debe tener 2 caracteres o mas')
      }
      if (apellido.value.length > 20) {
        errors.push('Tu nombre es muy largo')
      }
      if (errors.length > 0) {
        event.preventDefault();
        let ulErrors = document.querySelector('.formError ul');
        errors.forEach(error => {
          ulErrors.innerHTML += `<li> ${error} </li>`
        })
      }
    }

    email.onfocus = function (event) {
      event.preventDefault();
      if (email.value.length >= 1 && email.value.length < 6) {
        errors.push('Porfavor ingrese un mail correcto')
      };
      if (email.value.length == 0) {
        errors.push("Debes completar este campo")
      };
      if (errors.length > 0) {
        event.preventDefault();
        let ulErrors = document.querySelector('.formError ul');
        errors.forEach(error => {
          ulErrors.innerHTML += `<li> ${error} </li>`
        })
      }
    };
    
   

      



  };