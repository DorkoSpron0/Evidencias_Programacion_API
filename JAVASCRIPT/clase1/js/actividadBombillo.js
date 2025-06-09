function encenderApagarBombillo(interruptor){
    let pic;

    if(interruptor == 0){
        pic = "./img/focoOff.webp"
    }else{
        pic = "./img/focoOn.webp"
    }

    document.getElementById("bombillo").src = pic
}