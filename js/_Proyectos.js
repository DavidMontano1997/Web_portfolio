class  My_Project {
    Request_JSON(){
        const URL = "js/proyectos.json";

        fetch(URL)
            .then(response => response.ok == true ? response.json() : `Error ${response.status}: ${response.statusText}`)
            .then(response => { 
                if(typeof response === "object"){
                    this.Write_HTML(response);
                } else {
                    console.error(response);
                };
            })
            .catch(error   => console.log(error));
    };

    Write_HTML(response){
        const Row = document.querySelector("#projects div.row"); // div que contiene las tarjetas proyectos.

        response.forEach(project => {
            const { title, review, link, image } = project;
            const div = document.createElement("div");

            div.className = "col-xs-12 col-sm-6 col-md-6 col-lg-4 mb-4";
            div.innerHTML = `
                <div class="projects-content-img-description position-relative">
                    <figure>
                        <img src="img/${image}" class="img-fluid mx-auto"alt=""><!-- Las imagenes deben tener unas dimensiones de 600x400 -->
            
                        <figcaption class="text-center position-absolute d-flex flex-column justify-content-center">
                            <div>
                                <h4>${title}</h4>
                                <p>${review}</p>
                                <a href="${link}" class="My-button-blue mt-3" target="_blank" rel="noopener noreferrer">
                                    <i class="bi bi-search"></i> Ver proyecto
                                </a>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            `;

            Row.appendChild(div);
        });
    }
};

export default My_Project;