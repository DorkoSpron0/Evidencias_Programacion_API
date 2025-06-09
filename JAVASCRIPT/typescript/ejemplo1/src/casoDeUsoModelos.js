"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstudianteClase = void 0;
class EstudianteClase {
    constructor(id, nombre, apellido) { }
    getStudent(id) {
        console.log("Estudiante con id " + id);
    }
    addStudent(student) {
        console.log(student + " añadido");
    }
    removeStudent(id) {
        console.log("Estudiante con id " + id + " eliminado");
    }
}
exports.EstudianteClase = EstudianteClase;
class NotaClase {
    constructor(id, id_student, matematicas, ingles) { }
    addNote(nota) {
        console.log(nota + " añadida");
    }
}
