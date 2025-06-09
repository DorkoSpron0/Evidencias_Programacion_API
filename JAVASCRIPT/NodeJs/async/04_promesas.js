const promesaDePizza = new Promise((resolve, reject) => {
    let pizzaLista = false;

    if(pizzaLista){
        resolve("La pizza está lista")
    }else{
        reject("No se pudo hacer la pizza")
    }
})

promesaDePizza
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg))