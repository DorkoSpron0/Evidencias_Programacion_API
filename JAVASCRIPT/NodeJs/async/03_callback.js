// function pedirPizza(callback){
//     console.log('Pidiendo pizza')
//     setTimeout(() => {
//         console.log('La pizza está lista')
//         callback()
//     }, 3000);
// }

// function comerPizza(){
//     console.log('Ahora puedo comer la pizza')
// }

// pedirPizza(comerPizza)

function verificarCandidato(nombre, cumpleRequisitos, noCumpleRequisitos){
    const cumple = Math.random() > 0.5;

    if(cumple){
        cumpleRequisitos(nombre)
    }else{
        noCumpleRequisitos(nombre)
    }
}

function aceptarCandidato(nombre){
    console.log(`${nombre} ha sido aceptado. Se procede con la oferta`);
}

function rechazarCandidato(nombre){
    console.log(`${nombre} no cumple con los requisitos. Se notificará`);
}

verificarCandidato("nicky", aceptarCandidato, rechazarCandidato)