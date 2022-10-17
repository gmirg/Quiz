//Funcion para traer y guardar preguntas CATEGORIAS: Videojuegos = 15, Ordenadores = 18, comics = 29, dibujos animados = 32
function buscarPreguntas() {
    var categoria = localStorage.getItem('categoria');
    fetch(`https://opentdb.com/api.php?amount=10&category=${categoria}&type=multiple`) // amount = 10, esto trae 10 preguntas de la API
        .then(res => res.json())
        .then(json => {
            localStorage.setItem("preguntas", JSON.stringify(json.results))
            localStorage.setItem("contador", "0");
            localStorage.setItem("aciertos", "0");
            juego()
        })
}

function juego() {
    // esta parte cambia de color las casillas de las respuestas
    let resetColor = document.querySelector(".resp");
    if (resetColor != null) {
        resetColor.style.backgroundColor = "white";
        resetColor.setAttribute("class", "caja");
    }
    // esta es la parte principal de la función
    let cont = parseInt(localStorage.getItem("contador"));
    if (cont < 10) {
        mostrarPregunta(cont);
        mostrarRespuestas(cont);
        console.log("contador al ejecutar juego " + cont);
    } else {
        window.location = "resultados.html";
        guardarResultado();
    }
}

function guardarResultado() {
    //creamos una clase Puntuacion donde guardamos Fecha y numero de aciertos
    let date = new Date().toDateString();
    let aciertos = localStorage.aciertos;
    let Puntuacion = class {
        constructor(date, aciertos) {
            this.date = date;
            this.aciertos = aciertos;
        }
    }
    var p = new Puntuacion(date, aciertos);
    var puntuaciones = [];
    // recogemos la info del storage, le añadimos el ultimo resultado y volvemos a guardar
    var historial = localStorage.getItem("historial");
    if (!historial) {
        puntuaciones.push(p);
        localStorage.setItem("historial", JSON.stringify(puntuaciones));
    } else {
        historial = JSON.parse(historial);
        historial.push(p);
        localStorage.setItem("historial", JSON.stringify(historial));
    }
}

// funcion que selecciona la categoria de preguntas con las que vamos a concursar
function seleccionar(cat) {
    localStorage.setItem("categoria", `${cat}`);
}
// funcion que muestra los resultados al final de la partida.

function mostrarResultados() {
    var catResult = document.getElementById("catResult");
    var aciertoResult = document.getElementById("aciertoResult");
    var porcentajeResult = document.getElementById("porcentajeResult");
    var categoria = localStorage.getItem("categoria");
    switch (categoria) {
        case "29": catResult.innerText = "Cómics"
            break;
        case "18": catResult.innerText = "Ordenadores"
            break;
        case "15": catResult.innerText = "Video-Juegos"
            break;
        case "32": catResult.innerText = "Dibujos Animados"
            break;
    }
    aciertoResult.innerHTML = localStorage.aciertos;
    porcentajeResult.innerHTML = localStorage.aciertos * 10 + "% Nerd";
}


function mostrarPregunta(num) {
    let preguntas = JSON.parse(localStorage.getItem("preguntas"));

    let enunciados = [];
    for (let i = 0; i < preguntas.length; i++) {
        enunciados.push((preguntas[i].question));
    }
    let cuadroPregunta = document.getElementById("pregunta");
    // poner Cuadrorespuesta.innerHTML = algo, quiere decir que en el hueco que hay entre llaves en el html colocas ese algo.
    cuadroPregunta.innerHTML = (`${enunciados[num]}`);
}

function mostrarRespuestas(num) {
    let preguntas2 = JSON.parse(localStorage.getItem("preguntas"));
    console.log(preguntas2);
    let correctas = [];
    for (let i = 0; i < preguntas2.length; i++) {
        correctas.push(preguntas2[i].correct_answer);
    }
    let incorrectas = [];
    for (let j = 0; j < preguntas2.length; j++) {
        incorrectas.push((preguntas2[j].incorrect_answers));
    }
    //aqui metes las 4 respuestas
    let respuestas = [correctas[num], incorrectas[num][0], incorrectas[num][1], incorrectas[num][2]];
    // pones en un array las cuatro respuestas, luego haces el random y una funcion que coloque las 4 respuestas desordenadas en cada div respuesta`${i}`
    var respDesorden = respuestas.sort(() => Math.random() - 0.5);
    for (let k = 0; k < respDesorden.length; k++) {
        var cuadroRespuesta = document.getElementById(`respuesta${k}`);
        // poner Cuadrorespuesta.innerHTML = algo, quiere deccir que en el hueco que hay entre llaves en el html colocas ese algo.
        // añado .replace para que el texto aparezca bien
        cuadroRespuesta.innerHTML = respDesorden[k];
    }
}

// funcion que compara la respuesta que marca el usuario con la correcta, suma al contador y pasa a la siguiente pregunta.
function responder(n) {
    let respuestaMarcada = document.getElementById(`respuesta${n}`);
    let preguntas = JSON.parse(localStorage.getItem("preguntas"));
    let correctas = [];
    for (let i = 0; i < preguntas.length; i++) {
        correctas.push(preguntas[i].correct_answer);
    }
    var cont = localStorage.getItem("contador");
    let acertada = localStorage.getItem("aciertos");
    if (respuestaMarcada.innerText == correctas[cont]) {
        respuestaMarcada.setAttribute("class", "resp");
        respuestaMarcada.style.backgroundColor = "green";
        cont = parseInt(localStorage.getItem("contador")) + 1;
        acertada = parseInt(localStorage.getItem("aciertos")) + 1;
        localStorage.setItem("contador", `${cont}`);
        localStorage.setItem("aciertos", `${acertada}`);
        setTimeout(juego, 1000);
    } else {
        respuestaMarcada.setAttribute("class", "resp");
        respuestaMarcada.style.backgroundColor = "red";
        cont = parseInt(localStorage.getItem("contador")) + 1;
        localStorage.setItem("contador", `${cont}`);
        setTimeout(juego, 1000);
    }
}

/* ------------------------------------- SCRIPT GRÁFICAS --------------------------------------- */

var historial = JSON.parse(localStorage.historial);
var datos = historial.map(element => { return parseInt(element.aciertos) })
var labels = historial.map(element => { return element.date });
const data = {
    labels: labels,
    datasets: [{
        label: '% NERD (Últimos resultados)',
        backgroundColor:'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: datos,
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                max: 10,
                min: 0,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
};
