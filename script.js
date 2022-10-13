var preguntas;
fetch(`https://opentdb.com/api.php?amount=10`)
.then(res=>res.json())
.then((json)=>{
    preguntas = json.results
    preguntas.forEach((element , i) => {
        localStorage.setItem(`Pregunta${i}`, JSON.stringify(elemento))});
});

console.log(localStorage)