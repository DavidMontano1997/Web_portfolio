import my_alert from "./_messageAlert.js";

class formulary {
    constructor(){
        this.name                = document.querySelector("#form-input-name"),
        this.email               = document.querySelector("#form-input-email"),
        this.project_description = document.querySelector("#form-textarea-description")
    };

    collecting_information(event_formulary){
        const array        = Object.entries(this);
        const RegExp_text  = /\w+/g;
        const RegExp_email = /\b[a-zA-Z0-9_\-\.]{5,30}@[a-z]{5,7}\.[a-z]{2,3}\b/g;
        let   client       = {};

        array.forEach((element) => {
            const [ key, input ] = element;
            let option = { client, key, input };
    
            if(key === "name" || key === "project_description") {  
                option.RegExp = RegExp_text; // le agregamos la expresion regular requerida en base a su contexto.

                this.Search_of_conditions(option); //  .
            } else if(key === "email"){
                option.RegExp = RegExp_email; 

                this.Search_of_conditions(option);
            };
        });

        const error = this.validate_information(client); // Buscamos errores.

        if(error === false){ // no existen errores.
            const $alert = new my_alert({
                typeAlert   : "success",  
                messageAlert: "Enviando información...", 
                nodeParent  : document.body // elemento padre donde se inyectar la alerta.
            });
            
            $alert.start_alert(); // mostramos alert.
            this.connecting_the_API(event_formulary); // enviar correo por medio de API. 
            setTimeout(() => document.querySelector("#form-to-contact-me").reset(), 6500); // limpiamos el formulario.
        };
    };

    Search_of_conditions(option){
        let { client, key, input, RegExp } = option;
        let conditions = RegExp.test(input.value);

        if(conditions){
            client[key] = input.value;
        } else {
            client[key] = null;
        }

        return client;
    };
    
    validate_information(client){
        const buscarErrores = Object.entries(client);

        for(let i = 0; i < buscarErrores.length; i++){
            let array_child = buscarErrores[i];
            let value       = array_child[1];

            if(value === null){ // existen errores.
                const $alert = new my_alert({
                    typeAlert   : "error",  
                    messageAlert: "Verifica tu información...", 
                    nodeParent  : document.body // elemento padre donde se inyectara la alerta.
                });

                $alert.start_alert();// mostramos alert
                i = buscarErrores.length;// detenemos la ejecucion del for al encontrar el primer error.

                return true;
            } else if(i === 2){ // preguntamos si ya nos encontramos en la posicion final para poder retornar.
                return false;
            };
        };
    };

    connecting_the_API(event_formulary){
        const form   = event_formulary.target;
        const URL    = form.action;
        const init   = {
                        method : form.method,
                        body   : new FormData(form),
                        headers: { 'Accept': 'application/json' },
                    };

        fetch(URL,init)
        .then((response) => response.json())
        .then((response) => ModifyPopupAlert(response))
        .catch((error) => {
            alert(error);
            console.error(error);
            document.querySelector("#alert").style.display = "none"; // ocultamos la alerta
        });
        
        function ModifyPopupAlert(response){
            const { ok } = response;

            if(ok){
                setTimeout(() => {
                    // Se modifica el mensaje de alerta, una vez se haya enviado la información al correo.
                    const AlertText = document.querySelector("#alert .alert-text-message p");
                    AlertText.textContent = "Información enviada...";

                    // Cambiamos el icono de la alerta 
                    const AlertIcon = document.querySelector("#alert .alert-icon-message");
                    AlertIcon.classList.remove("processing"); // esta clase es la encargada de hacer rotar el icono, que en un principio es la tuerca la cual después de determinado tiempo va a ser remplazada por el check.
                    AlertIcon.innerHTML = `<i class="bi bi-check-circle-fill"></i>`;
                },1500);
            };
        };
    };
};

export default formulary;