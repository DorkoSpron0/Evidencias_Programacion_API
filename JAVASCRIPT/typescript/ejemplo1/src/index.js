"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// setTimeout(function() : void {
//     console.log("Hola desde función anónima (TS)");
// }, 3000);
// const sumar = (a: number, b: number) => a + b;
// console.log(sumar(2,2));
// function saludar(nombre: string, callback: () => void): void{
//     console.log('hola ' + nombre);
//     callback()
// }
// saludar('Nicky', () => {
//     console.log("Callback ejecutado");
// });
// async function obtenerDatos(): Promise<void> {
//     const data = await fetch("https://dog.ceo/api/breeds/image/random")
//     const json = await data.json()
//     console.log(json);
// }
// obtenerDatos()
// const promesa: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("Hecho")
//     }, 2000);
// })
// promesa.then(console.log)
// const suma = (...numeros: number[]): number => numeros.reduce((a,b) => a + b)
// console.log(suma(1,2,3))
// interface Persona {
//     nombre: string,
//     edad: number
// }
// const persona: Persona = {nombre: 'Nicky', edad: 20}
// console.log(PI);
class Animal {
    constructor(nombre) {
        this.nombre = nombre;
    }
    sonido() {
        console.log(this.nombre + " hace sonido");
    }
}
