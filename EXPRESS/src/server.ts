import express, {Request, Response} from 'express';
import { createUser, getUserById, listUsers, updateUserName } from './asyncUserService';
import {addStudent, getAllStudents, Student, updateStudent} from './useCaseService'

const app = express()
const PORT = 3000;

app.use(express.json())

app.get('/users', async (req: Request, res: Response) => {
    const users = await listUsers();
    res.json(users)
})

app.get('/users/:id', async (req, res) => {
    const user = await getUserById(req.params.id)
    if(!user) return res.status(404).send("Usuario no encontrado");
    return res.json(user)
})

app.post('/users', async (req: Request, res: Response) => {
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).send("Nombre y edad son requeridos");
    }
    const user = await createUser(name, age);    
    return res.status(201).json(user);
});

app.put('/users/:id', async (req, res) => {
    const {newName} = req.body;
    const user = await updateUserName(req.params.id, newName)
    if(!user) return res.status(404).send("Usuario no encontrado");
    return res.json(user)
})

/*--------------------STUDENTS--------------------------*/

app.get('/students', async (req, res) => {
    const students = await getAllStudents();
    res.json(students)
})

app.post('/students', async (req, res) => {
    const {name, lastname} = req.body
    const student: Student = await addStudent(name, lastname);
    return res.status(201).json(student)
})

app.put('/students/:id', async (req, res) => {
    const {newName, newLastName} = req.body
    const student = await updateStudent(req.params.id, newName, newLastName)
    return res.status(200).json(student)
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})