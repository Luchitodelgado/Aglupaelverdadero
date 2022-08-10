window.addEventListener("load",function(){
    let formularioLogin = document.querySelector("loginForm");

    formularioLogin.addEventListener("submit",function(e){
        e.preventDefault();

        let campoEmail= document.getElementById("loginEmail");
        let campoPassword= document.getElementById("password");

        if(campoEmail.value.length == ""){
            console.log("Este campo es obligatorio")
        };
        if(campoEmail.value == validator){
            console.log("Este campo debe contener un email válido")
        };

        if(campoPassword.value == ""){
            console.log("Este campo es obligatorio")
        }
        if(campoPassword.value.length >= 8){
            console.log("La contraseña debe tener al menos 8 caracteres")
        }
        
    })




})