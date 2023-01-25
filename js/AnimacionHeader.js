function writer(){
    const typed = new Typed('#animation-typewriter', {
        strings       : ["javascript","html5","frontend","css3","ui/ux","boostrap","sass"],
        typeSpeed     : 75,      // velocidad de tiempo.
        startDelay    : 100,     // tiempo antes de que inicie a escribir.
        backSpeed     : 75,      // velocidad de retroceso.
        smartBackspace: false,   // Solo borrar lo que no coincide con la cadena anterior.
        shuffle       : false,   // barajar lo strings.
        backDelay     : 700,     // tiempo antes de retoceder.
        loop          : true,    // bucle.
        loopCount     : Infinity,// cantidad de veces que se debe repetir el array, acepta numeros.
        showCursor    : true,    // mostrar cursor.
        cursorChar    : '|',     // tipo de cursor.
        contentType   : 'html',  // tipo de texto a mostrar
    });
};

export default writer;