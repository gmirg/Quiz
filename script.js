var preguntas;
fetch(`https://opentdb.com/api.php?amount=10`)
    .then(res => res.json())
    .then((json) => {
        preguntas = json.results
        preguntas.forEach((element, i) => {
            localStorage.setItem(`Pregunta${i}`, JSON.stringify(elemento))
        });
    });

console.log(localStorage)

function moverBarra() {
    var i = 0;
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("barra");
        var width = 1;
        var id = setInterval(frame, 150);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }
}