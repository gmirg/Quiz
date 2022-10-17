//Funcion para traer y guardar preguntas CATEGORIAS: Videojuegos = 15, Ordenadores = 18, comics = 29, dibujos animados = 32
function buscarPreguntas() {
    var categoria = localStorage.getItem('categoria');
    console.log(categoria)
    fetch(`https://opentdb.com/api.php?amount=10&category=${categoria}&type=multiple`) // amount = 10, esto trae 10 preguntas de la API
        .then(res => res.json())
        .then(json => {
            localStorage.setItem("preguntas", JSON.stringify(json.results))
            localStorage.setItem("contador", "0");
            localStorage.setItem("aciertos", "0");
            localStorage.setItem("fallos", "0");
            juego()

        })
}
function juego() {
    let resetColor = document.querySelector(".resp");
    console.log(resetColor);
    if (resetColor != null) {
        resetColor.style.backgroundColor = "white";
        resetColor.setAttribute("class", "caja");
    }
    let cont = parseInt(localStorage.getItem("contador"));
    if (cont < 10) {
        mostrarPregunta(cont);
        mostrarRespuestas(cont);
        console.log("contador al ejecutar juego " + cont);
        // moverBarra();
    } else {
        window.location = "resultados.html";
    }
}
function guardarResultado() {
    let date = new Date().toDateString();
    let aciertos = localStorage.aciertos;
    let puntuacion = class {
        constructor(date, aciertos) {
            this.date = date;
            this.aciertos = aciertos;
        }
    }
    var p = new puntuacion(date, aciertos)
    var puntuaciones = []
    console.log(puntuaciones)

    var historial = localStorage.getItem("historial")
    if (!historial) {
        puntuaciones.push(p)
        localStorage.setItem("historial", JSON.stringify(puntuaciones))
    } else {
        historial = JSON.parse(historial)
        historial.push(p)
        localStorage.setItem("historial", JSON.stringify(historial))
        console.log(historial)
    }
}
function seleccionar(cat) {
    localStorage.setItem("categoria", `${cat}`)
}
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
    porcentajeResult.innerHTML = localStorage.aciertos * 10 + "% Nerd"
}
function mostrarPregunta(num) {
    let preguntas = JSON.parse(localStorage.getItem("preguntas"));

    let enunciados = [];
    for (let i = 0; i < preguntas.length; i++) {
        enunciados.push((preguntas[i].question))
    }
    let cuadroPregunta = document.getElementById("pregunta");
    // poner Cuadrorespuesta.innertext = algo, quiere deccir que en el hueco que hay entre llaves en el html colocas ese algo.
    cuadroPregunta.innerHTML = (`${enunciados[num]}`)
    console.log(num)
    console.log(enunciados[num])
}

function mostrarRespuestas(num) {
    let preguntas2 = JSON.parse(localStorage.getItem("preguntas"));
    console.log(preguntas2)
    let correctas = [];
    for (let i = 0; i < preguntas2.length; i++) {
        correctas.push(preguntas2[i].correct_answer)
    }
    let incorrectas = [];
    for (let j = 0; j < preguntas2.length; j++) {
        incorrectas.push((preguntas2[j].incorrect_answers))
    }
    console.log(correctas)
    console.log(incorrectas)
    //aqui metes las 4 respuestas
    let respuestas = [correctas[num], incorrectas[num][0], incorrectas[num][1], incorrectas[num][2]];
    console.log(respuestas);
    // pones en un array las cuatro respuestas, luego haces el random y una funcion que coloque las 4 respuestas desordenadas en cada div respuesta`${i}`
    var respDesorden = respuestas.sort(() => Math.random() - 0.5);
    console.log(respDesorden)
    for (let k = 0; k < respDesorden.length; k++) {
        var cuadroRespuesta = document.getElementById(`respuesta${k}`);
        // poner Cuadrorespuesta.innertext = algo, quiere deccir que en el hueco que hay entre llaves en el html colocas ese algo.
        // añado .replace para que el texto aparezca bien
        cuadroRespuesta.innerHTML = respDesorden[k]
        console.log(cuadroRespuesta.innerText)
    }
}

function responder(n) {
    let respuestaMarcada = document.getElementById(`respuesta${n}`);
    console.log(respuestaMarcada)
    let preguntas = JSON.parse(localStorage.getItem("preguntas"));
    let correctas = [];
    for (let i = 0; i < preguntas.length; i++) {
        correctas.push(preguntas[i].correct_answer)
    }
    var cont = localStorage.getItem("contador");
    let acertada = localStorage.getItem("aciertos");
    console.log(correctas[cont])
    if (respuestaMarcada.innerText == correctas[cont]) {
        // alert("ole ole ole");
        respuestaMarcada.setAttribute("class", "resp");
        respuestaMarcada.style.backgroundColor = "green";
        cont = parseInt(localStorage.getItem("contador")) + 1;
        console.log("contador" + cont)
        acertada = parseInt(localStorage.getItem("aciertos")) + 1;
        localStorage.setItem("contador", `${cont}`);
        localStorage.setItem("aciertos", `${acertada}`)
        setTimeout(juego, 1000);
    } else {
        // alert("fallaste");
        respuestaMarcada.setAttribute("class", "resp");
        respuestaMarcada.style.backgroundColor = "red";
        cont = parseInt(localStorage.getItem("contador")) + 1;
        localStorage.setItem("contador", `${cont}`);
        setTimeout(juego, 1000);
    }
}
// function moverBarra() {
//     var i = 0;
//     if (i == 0) {
//         i = 1;
//         var elem = document.getElementById("barra");
//         var width = 1;
//         var id = setInterval(frame, 150);
//         function frame() {
//             if (width >= 100) {
//                 clearInterval(id);
//                 i = 0;
//             } else {
//                 width++;
//                 elem.style.width = width + "%";
//             }
//         }
//     }
// }
// function moverBarra() {
//     var i = 0;
//     if (i == 0) {
//         i = 1;
//         var elem = document.getElementById("barra");
//         var width = 1;
//         var id = setInterval(frame, 150);
//         function frame() {
//             if (width >= 100)  {
//                 clearInterval(id);
//                 i = 0;
//                 cont = parseInt(localStorage.getItem("contador")) + 1;
//                 localStorage.setItem("contador", `${cont}`);
//                 fallada = parseInt(localStorage.getItem("fallos")) + 1;
//                 localStorage.setItem("fallos", `${fallada}`);
//                 width = 0;
//                 juego()
//             } else {
//                 width++;
//                 elem.style.width = width + "%";
//             }
//         }
//     }
// }