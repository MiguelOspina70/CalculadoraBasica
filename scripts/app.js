const pantalla = document.getElementById('pantalla'); //Triago el input que destine como pantalla

const botones = document.querySelectorAll(".boton") //Guardo en una variable cada boton


//Recorro todos los botones con el foreach y agrego un evento al dar click, el cual es tomar el valor del boton y mostrarlo en la pantalla, concatenando lo que doy click
botones.forEach(element => { 
    element.addEventListener('click', function(event) {
        const valor = event.target.textContent
        if (valor === 'AC') {
            pantalla.value = '';
        }else{
            pantalla.value += valor;

        }
    });
});