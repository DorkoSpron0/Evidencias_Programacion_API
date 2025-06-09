// function hervirAgua(){
//     return new Promise((resolve) => {
//         console.log("Poniendo el agua a hervir");
//         setTimeout(() => {
//             resolve("El agua está lista")
//         }, 3000);
//     })
// }

// async function hacerCafe(){
//     console.log("Preparando para hacer café");
//     const agua = await hervirAgua()
//     console.log(agua);
//     console.log("El café está listo");
// }

// hacerCafe()

function validarPedido(pedidoId){
    return new Promise((resolve) => {
        console.log(`Validando el pedido ${pedidoId}`);
        setTimeout(() => {
            resolve(`Pedido ${pedidoId} validado.`)
        }, 3000);        
    })
}

function notificarAlmacen(pedidoId){
    return new Promise((resolve) => {
        console.log(`Notificando el almancén sobre el pedido ${pedidoId}`);
        setTimeout(() => {
            resolve(`Almacen notificado para el pedido ${pedidoId}`)
        }, 1000);
    })
}

function confirmarFinanzas(pedidoId){
    return new Promise((resolve) => {
        console.log(`Confirmando a finanzas el pedido ${pedidoId}`);
        setTimeout(() => {
            resolve(`Finanzas confirmadas para el pedido ${pedidoId}`)
        }, 1500);    
    })
}

async function procesarPedido(pedidoId){
    console.log(`Iniciando el procesamiento del pedido ${pedidoId}`);
    const resultadoValidation = await validarPedido(pedidoId)
    console.log(resultadoValidation);
    
    const resultadoAlmacen = await notificarAlmacen(pedidoId)
    console.log(resultadoAlmacen);

    const resultadoFinanzas = await confirmarFinanzas(pedidoId)
    console.log(resultadoFinanzas);

    console.log(`Pedido ${pedidoId} procesado exitosamente`);
}

procesarPedido(999)