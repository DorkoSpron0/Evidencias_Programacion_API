import fs from 'fs/promises'
import {v4 as uuid} from 'uuid'

const FILE_PATH = './src/students.json'

export interface Student {
    id: string,
    name: string,
    lastname: string
}

export async function getAllStudents(): Promise<Student[]> {
    try{
        const data = await fs.readFile(FILE_PATH, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

export async function addStudent(name: string, lastname: string): Promise<Student>{
    const students = await getAllStudents();
    const newStudent: Student = {id: uuid(), name, lastname};
    students.push(newStudent);
    await fs.writeFile(FILE_PATH, JSON.stringify(students, null, 2))
    return newStudent;
}

export async function updateStudent(id: string, newName: string, newLastname: string): Promise<Student | undefined> {
    const students = await getAllStudents();
    const student = students.find(u => u.id === id)
    if(student){
       student.name = newName
       student.lastname = newLastname;
       await fs.writeFile(FILE_PATH, JSON.stringify(students, null, 2))
       return student;
    }
}