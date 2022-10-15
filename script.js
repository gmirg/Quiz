//Funcion para traer y guardar preguntas CATEGORIAS: Videojuegos = 15, Ordenadores = 18, comics = 29, dibujos animados = 32
function buscarPreguntas(categoria){
fetch(`https://opentdb.com/api.php?amount=10&category=${categoria}&type=multiple`) // amount = 10, esto trae 10 preguntas de la API
    .then(res => res.json())
    .then(json => {
        localStorage.setItem("preguntas", JSON.stringify(json.results))
        localStorage.setItem("contador", "0")
    })
}
function empezarJuego() {
    buscarPreguntas();
    juego() 
}
function mostrarPregunta(num) {
    let preguntas = JSON.parse(localStorage.getItem("preguntas"));

    let enunciados = [];
    for (let i = 0; i < preguntas.length; i++) {
        enunciados.push((preguntas[i].question))
    }
    let cuadroPregunta = document.getElementById("pregunta");
    // poner Cuadrorespuesta.innertext = algo, quiere deccir que en el hueco que hay entre llaves en el html colocas ese algo.
    cuadroPregunta.innerText = (`${enunciados[num]}`).replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
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
        cuadroRespuesta.innerText = respDesorden[k].replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
        console.log(cuadroRespuesta.innerText)
    }
}

function responder(n) {
    let respuestaMarcada = document.getElementById(`respuesta${n}`).innerText;
    console.log(respuestaMarcada)
    let preguntas = JSON.parse(localStorage.getItem("preguntas"));
    let correctas = [];
    for (let i = 0; i < preguntas.length; i++) {
        correctas.push(preguntas[i].correct_answer)
    }
    var cont = localStorage.getItem("contador")
    console.log(correctas[cont])
    if (respuestaMarcada == correctas[cont]) {
        alert("ole ole ole");
        var cont = parseInt(localStorage.getItem("contador")) + 1;
        console.log("contador" + cont)
        localStorage.setItem("contador", `${cont}`);
        juego();
    } else {
        alert("has fallado")
    }
}
function juego() {
    let cont = parseInt(localStorage.getItem("contador"));
    mostrarPregunta(cont);
    mostrarRespuestas(cont);
    console.log("contador al ejecutar juego " + cont);
    moverBarra();
}

function moverBarra() {
    var i = 0;
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("barra");
        var width = 1;
        var id = setInterval(frame, 30);
        function frame() {
            if (width >= 78 || i==0) {
                clearInterval(id);
                i = 0;
            } else {
                width = width + 0.1;
                elem.style.width = width + "vw";
            }
        }
    }
}