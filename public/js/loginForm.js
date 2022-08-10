window.addEventListener("load",function(){
    let formularioLogin = document.querySelector("loginForm");

    formularioLogin.addEventListener("submit",function(e){
        let erorrs =[];

        let campoEmail= document.getElementById("loginEmail");
        let campoPassword= document.getElementById("password");

        if(campoEmail.value.length == ""){
            erorrs.push("Este campo es obligatorio")
        }
        if(campoEmail.value == validator){
            erorrs.push("Este campo debe contener un email válido")
        }

        if(campoPassword.value == ""){
            erorrs.push("Este campo es obligatorio")
        }
        if(campoPassword.value.length >= 8){
            erorrs.push("La contraseña debe tener al menos 8 caracteres")
        }

        if(erorrs.length > 0){
            e.preventDefault();
        };

        let ulErrors = document.querySelector(".errors")
        for (let i = 0; i < erorrs.length; i++) {
            ulErrors.innnerHTML += "<li>" + erorrs[i] + "</li>"
            
        }

    })

})