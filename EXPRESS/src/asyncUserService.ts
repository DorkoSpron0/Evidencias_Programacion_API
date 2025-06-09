import fs from 'fs/promises'
import { v4 as uuid } from 'uuid'

export interface User {
    id: string,
    name: string,
    age: number
}

const FILE_PATH = './src/users.json'

async function readUsers(): Promise<User[]> {
    try{
        const data = await fs.readFile(FILE_PATH, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

async function writeUsers(users: User[]): Promise<void> {
    await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2))
}

export async function createUser(name: string, age: number): Promise<User> {
    const users = await readUsers();
    const newUser: User = {id: uuid(), name, age};
    users.push(newUser);
    await writeUsers(users)
    return newUser;
}

export async function listUsers(): Promise<User[]> {
    return await readUsers();
}

export async function getUserById(id: string): Promise<User | undefined> {
    const users = await readUsers();
    const user = users.find(u => u.id === id)
    if(user){
        return user
    }
}

export async function updateUserName(id: string, newName: string): Promise<User | undefined> {
    const users = await readUsers();
    const user = users.find(u => u.id === id)
    if(user){
       user.name = newName
       await writeUsers(users)
       return user;
    }
}