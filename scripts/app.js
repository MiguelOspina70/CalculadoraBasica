const pantalla = document.getElementById('pantalla'); //Se toma el input que se destino como pantalla en el html por su id y se almacena en una variable
const botones = document.querySelectorAll(".boton") //Se toma todos los botones de la calculadora por su clase y se almacena en una variable, este se comportara como un array

let bloqueado = false; //Variable auxiliar que se usa para bloquear el input si hay un error en la sintaxis

//Logica principal, con el foreach se esta recorriendo todos los botones de la calculadora y agregando un evento click a cada uno de ellos
botones.forEach(element => {
    element.addEventListener('click', function(event) {

        const valor = event.target.textContent;
        if (bloqueado) return; //Si bloqueado es true, no se ejecuta el resto del codigo, entonces no se puede escribir nada en la pantalla si hubo un error de sintaxis previamente

        switch (valor) { 
            case 'AC': //Boton de limpiar todo
                pantalla.value = '';
                actualizarEstadoIgual(); //Funcion que deshabilita el boton igual si la pantalla esta vacia
                break;
            case '⌫': //Boton de borrar un caracter
                pantalla.value = pantalla.value.slice(0, -1); //Elimina el ultimo caracter de la pantalla
                actualizarEstadoIgual();
                break;
            case '=': //Boton de igual, se usa un try catch para manejar errores de sintaxis
                try { 
                    let resultado = eval(pantalla.value); //Evalua la expresion que hay en la pantalla, eval es una funcion de JavaScript que evalua una cadena de texto como si fuera codigo JavaScript y puede hacer operaciones matematicas básicas

                    if (resultado === Infinity || resultado === -Infinity || isNaN(resultado)) { //Si el resultado es infinito o NaN, se muestra un mensaje de error, esto puede pasar si se intenta dividir por cero o si la expresion es incorrecta
                        bloqueado = true; //Bloquea la pantalla para evitar que se sigan ingresando datos
                        pantalla.value = 'Indefinido'; //Muestra un mensaje de error en la pantalla

                        setTimeout(() => { //SetTimeout sirve para ejecutar un bloque de código después de un cierto tiempo de espera, medido en milisegundos, esn este casd deja el mensaje de error por 1.5 segundos y luego lo borra
                            pantalla.value = '';
                            bloqueado = false; //Vuelve a permitir que se ingresen datos en la pantalla
                        }, 1500);
                    } else {
                        if (!Number.isInteger(resultado)) { //Si el resultado es un numero decimal, se redondea a 3 decimales
                            resultado = resultado.toFixed(3);
                        }
                        pantalla.value = resultado; //Si el resultado es valido, lo muestra en la pantalla
                    }

                } catch (error) { //Si hay un error de sintaxis, se captura y se muestra un mensaje de error
                    bloqueado = true;
                    pantalla.value = 'Sintax error';

                    setTimeout(() => { //Como se uso anteriormente, se muestra el mensaje de error por 1.5 segundos y luego lo borra
                        pantalla.value = '';
                        bloqueado = false;
                        actualizarEstadoIgual(); //deshabilita el boton igual ya que la pantalla esta vacia
                    }, 1500);
                }
                break;

            default: //Si el boton presionado es un numero o un operador, se agrega a la pantalla
                pantalla.value += valor;
                actualizarEstadoIgual();
                break;
        }
    });
});

//Funcion que actualiza el estado del boton igual, si la pantalla esta vacia lo deshabilita, si no lo habilita
function actualizarEstadoIgual() {
    const botonIgual = document.getElementById('igual'); //Traigo el boton igual del html por su id
    if (pantalla.value.trim() === '') {
        botonIgual.disabled = true; //Deshabilita el boton igual si la pantalla esta vacia  
    } else {
        botonIgual.disabled = false; //Habilita el boton igual si la pantalla no esta vacia
    }
}