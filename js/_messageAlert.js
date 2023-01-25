class my_alert {
    constructor({ typeAlert,messageAlert,nodeParent}){
        this.type         = typeAlert === "success" || typeAlert === "error" ? typeAlert : undefined ; // tipo de alerta = error,succes
        this.message      = messageAlert; // mensaje
        this.nodeParent   = nodeParent; // elemento padre donde se inyectara la alerta.
    };

    start_alert(){
        this.validating_information();
    };

    validating_information(){
        const array_properties = Object.entries(this);
        const array_length     = array_properties.length;
        let error;

        for(let i = 0; i < array_length;){
            const array_child = array_properties[i];
            error = array_child.some((element) => element === undefined); // Buscamos propiedades indefinidas en las matrizes.
            i++;

            if(error){ // Una vez encontramos una propiedad indefinida detenemos el bucle.
                i = array_length;
                console.error("ERROR: las alertas presonalizadas requieren de <<<3 PROPIEDADES>>> al momento de crearlas, por favor revisa el objecto que pasas como parametro a la instancia de la alerta.")
            };
        };

        if(!error){ // Si no existen errores pasamos a crear la alerta.
            this.define_alert_type();
        };
    };

    define_alert_type(){
        const $my_alert = document.querySelector("#alert");
        
        if(!$my_alert){
            let $type_alert;

            if(this.type === "success"){
                $type_alert = {
                    //icon     : `<i class="bi bi-check-circle-fill"></i>`,
                    icon     : `<i class="bi bi-gear-fill"></i>`,
                    title    : `Mensaje :`,
                    css_class: "success"// clase definida en el modulo "_alert.scss" encargada de darle la apariencia de una alerta positiva.
                };
            } else if(this.type === "error"){
                $type_alert = {
                    icon     : `<i class="bi bi-x-circle-fill"></i>`,
                    title    : `Mensaje :`,
                    css_class: "error"// clase definida en el modulo "_alert.scss" encargada de darle la apariencia de una alerta negativa.
                }
            }

            this.creating_alert($type_alert);
        };
    };

    creating_alert($type_alert){
        const { icon, title,  css_class } = $type_alert;
        const div = document.createElement("div");

        div.innerHTML = `
            <div id="alert" class="${css_class}">
                <div class="alert-content-child">
                    <div class="alert-icon-message ${css_class === "success" ? "processing" : "" }">${icon}</div>
                    <div class="alert-text-message">
                        <span>${title}</span>
                        <p>${this.message}</p>
                    </div>
                    <div class="alert-icon-close"><i class="bi bi-x-lg" id="alert-button-close"></i></div>
                    <span class="alert-bar-progress"></span>
                </div>
            </div>
        `;

        this.nodeParent.appendChild(div);

        setTimeout(() => this.activate_alert() ,100); // Activamos tanto la alerta como la barra de progreso.
        
        const hidden_alert = setTimeout(() => { // Una vez termine la barra de progreso, cambiamos el color de esta y ocultamos la alerta.
            document.querySelector("#alert .alert-bar-progress").style.background = "transparent";
            this.close_alert(div);
        } ,6500); // este es el tiempo total que dura la barra de progreso en finalizar, establecida con @keyframe en css.

        const $button_close = document.querySelector("#alert #alert-button-close"); // boton para cerrar la alerta de forma manual.

        $button_close.addEventListener("click", () => {
            clearTimeout(hidden_alert); // Eliminanos ya que no existe alerta y su tiempo en espera a ejecutarse puede presentar errores con alertas porsteriores. 
            this.close_alert(div);
        });
    };

    activate_alert(){
        document.querySelector("#alert").classList.add("active");
        document.querySelector("#alert .alert-bar-progress").classList.add("active");
    };

    close_alert(div){
        document.querySelector("#alert").classList.remove("active");
        setTimeout(() => div.remove() ,700);
    };
};

export default my_alert;