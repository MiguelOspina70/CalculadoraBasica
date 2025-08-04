
const pantalla = document.getElementById('pantalla'); //Triago el input que destine como pantalla
const botones = document.querySelectorAll(".boton") //Guardo en una variable cada boton
let bloqueado = false; //Variable para bloquear el input si hay un error en la sintaxis


//Recorro todos los botones con el foreach y agrego un evento al dar click, el cual es tomar el valor del boton y mostrarlo en la pantalla, concatenando lo que doy click
botones.forEach(element => { 
    element.addEventListener('click', function(event) {
        if (bloqueado) return; //Si el input esta bloqueado, no hace nada

        const valor = event.target.textContent
        if (valor === 'AC') {
            pantalla.value = '';
        }else if (valor === '⌫') {
            pantalla.value = pantalla.value.slice(0,-1)
        }else if (valor === '=') {
            try {
                pantalla.value = eval(pantalla.value); //Evalua la expresion que se encuentra en la pantalla
            } catch (error) {

                bloqueado = true; //Bloquea el input para que no se pueda seguir escribiendo si hay un error
                pantalla.value = 'Sintax error'; //Si hay un error, muestra "Error" en la pantalla
                setTimeout(() => {
                    pantalla.value = '';
                    bloqueado = false;
                }, 1500); //Limpia la pantalla despues de 1.5 segundos
            }
        }else{
            pantalla.value += valor;
        }
    });
});

