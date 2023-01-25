class OBJ_NavBar {
    constructor(){
        this.NavBar = document.querySelector("#navbar");
    }

    PositionFixed_And_HidenBarYellow(){
        const $Header    = document.querySelector("#header-container");
        const $configure = { root: null, rootMargin: "0px", threshold: [0,0.75]};
        const $Observer  = new IntersectionObserver(fn,$configure);

        let   $MY_navbar = this.NavBar;
        let   $My_class  = this;
        
        function fn(entries){
            let intersecting = entries[0].isIntersecting;

            // Cuando header desaparezca de la pantalla cambiamos las propiedades del navbar.
            if(intersecting === false){
                $MY_navbar.style.position  = "fixed";
                $MY_navbar.style.boxShadow = "0px 2px 8px #3a3a3a";
            } else {
                $MY_navbar.style.position  = "absolute";
                $MY_navbar.style.boxShadow = "none";
            };

            // Cuando el header llega a una vislibilidad superiores de 75% ocultamos la barra amarilla.
            let ratio_header = entries[0].intersectionRatio;

            if( ratio_header >= 0.75 && ratio_header <= 0.90){ 
                $My_class.HideYellowBar();
            };
        };

        $Observer.observe($Header);
        this.ScrollYellowBar();
    };

    ScrollYellowBar(){
        const $Sections        = [...document.querySelectorAll(".section-container section")];
        const $configure       = { root: null, rootMargin: "0px", threshold: 0.25 };
        const $ObserverSeccion = new IntersectionObserver(fn,$configure);

        let $MY_navbar = this.NavBar;
        let $MY_class  = this;

        // Se esta atento a la entrada de una nueva seccion en el viewport del ususario.
        $Sections.forEach((section) => {
            $ObserverSeccion.observe(section);
        });

        // Identificar la seccion.
        function fn(entries){ 
            entries.forEach((section) => {
                if(section.isIntersecting){
                    const CurrentSection = section.target;
                    const GetAttribute   = CurrentSection.getAttribute("id");

                    IdentifyLink(GetAttribute);
                };
            });
        };

        // Identificar el item en la barra de navegacion que hace referencia a la seccion.
        function IdentifyLink(GetAttribute){
            const ItemsNAV  = [...document.querySelectorAll("#navbar-content-item div li a")];
            const index = ItemsNAV.findIndex((item) => item.dataset.section === GetAttribute);

            ScrollingYellowBar(index); 
        };

        //Desplazar la barra amarilla hasta el item.
        function ScrollingYellowBar(index){
            const bar      = document.querySelector("#navbar-yellow-bar");
            const sizeLink = document.querySelector("#navbar-content-item div.col-3").offsetWidth;
            
            bar.style.width     = "190px";
            bar.style.transform = `translateX(${sizeLink * index}px)`;

            // desplazamiento del "nav" en versión movíl.
            if(screen.width <= 400){
                $MY_class.Scrolling_in_mobile_version(index);
            };

            // desplazamiento del "nav" en versión table.
            if(screen.width > 400 && screen.width <= 750){
                $MY_class.Scrolling_in_mobile_tablet(index);
            };
        };
    };

    HideYellowBar(){
        const $bar = document.querySelector("#navbar-yellow-bar");
        
        $bar.style.transform = `translateX(0px)`;
        $bar.style.width     = "0px";

        // desplazamiento del "nav" en versión movíl/tablet.
        this.Reset_scroll_nav_bar();
    };

    Scrolling_in_mobile_version(index){  
        const $GetCenters   = center(); // retorna un objecto con el resultado de dividir en 2 para obtener la mitad del viewport y de un items del menú.
        const $UniteCenters = Unite($GetCenters); // Se obtiene la diferencias en pixeles que le hacen falta al item para poder concidir su centro con el centro del viewport.
        const $ScrollingNav = scrolling($UniteCenters); // Se realiza el desplazamiento.

        function center(){
            let item = document.querySelector("#navbar-content-item div.col-3"); // item del menu.

            function divide(dividend,divisor){
                return dividend / divisor;
            };

            return {
                window : divide(screen.width,2), 
                NavItem:  divide(item.offsetWidth,2)
            };
        };

        function Unite($GetCenters){
            const { window, NavItem } = $GetCenters;

            /* Se le resta los 190 del tamaño del item "logo" a la mitad del tamaño total de la ventana 
            para saber cuantos pixeles del item "Acerca" estan dentro o le hacen falta para llegar a la 
            mitad de la pantalla y ese valor a su vez es restado a la mitad del valor total del item acerca 
            para así poder obtener la cantidad en pixeles a desplazar para centrar el item. */
            let result    = window - 190;
            let distance = NavItem - result;

            return distance;
        };

        function scrolling($UniteCenters){
            const sizeLink = document.querySelector("#navbar-content-item div.col-3").offsetWidth;

            const distance_to_move = { 
                // Se encarga de generar las distancias a recorrer desde el centro de un item a otro, multiplicando el tamaño del mismo item por 
                // el numero de posicion que ocupan la barra de navegacion, se ignora el logo.

                1: 0, // acerca.
                2: sizeLink * 1, // proyectos.
                3: sizeLink * 2 // contactar.
            };

            document.querySelector("#navbar").scrollLeft = $UniteCenters + distance_to_move[index]; 
        };
    };

    Scrolling_in_mobile_tablet(index){
        const Scroll_Width    = document.querySelector("#navbar").scrollWidth;
        const Window_Width    = screen.width;

        const parameters      = {
            Scroll_Width,
            Window_Width,
            index
        };

        function Calculate_displacement(parameters){
            let { Scroll_Width, Window_Width, index } = parameters;

            let result = ( Scroll_Width - Window_Width ) / 3; // dividimos entre 3 ya que el desplazamiento del nav depende del posicionamiento de solo 3 items, los cuales son:  acerca, proyectos, contactarme
            let round  = Math.round(result);

            return round * index;
        };

        document.querySelector("#navbar").scrollLeft = Calculate_displacement(parameters);
    };

    Reset_scroll_nav_bar(){
        if(screen.width <= 750){
            document.querySelector("#navbar").scrollLeft = 0;
        };
    }
};

export default OBJ_NavBar;