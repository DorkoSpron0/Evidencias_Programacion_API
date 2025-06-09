export class EstudianteClase {
    constructor(id: number, nombre: string, apellido: string){}

    getStudent(id: number){
        console.log("Estudiante con id " + id);
    }

    addStudent(student: Student){
        console.log(student + " añadido");
    }

    removeStudent(id: number){
        console.log("Estudiante con id " + id + " eliminado");
    }
}

class NotaClase {
    constructor(id: number, id_student: number, matematicas: number, ingles: number){}
    
    addNote(nota: Nota){
        console.log(nota + " añadida");
        
    }
}

export interface Student {
    id: number;
    nombre: string;
    apellido: string;
}

export interface Nota {
    id: number;
    id_student: number;
    matematicas: number;
    ingles: number;
}