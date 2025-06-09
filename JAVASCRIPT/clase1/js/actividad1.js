function mostrarMensajeIfAnidado(){
    var estatura = parseFloat(document.getElementById('estatura').value)
    var peso = parseFloat(document.getElementById('peso').value)
    var estadoCivil = document.getElementById('estadoCivil').value

    const parametroEstatura = 1.30
    const parametroPeso = 100
    const parametroEstadoCivil = "soltero"

    if(estatura >= parametroEstatura){
        if(peso <= parametroPeso){
            if(estadoCivil == parametroEstadoCivil){
                resultado = "papi saludable"
            }else{
                resultado = "no papi, no saludable, no soltero"
            }
        }else{
                resultado = "no papi, no saludable, goldito"
        }
    }else{
                resultado = "no papi, no saludable, enano"
    }
}