"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncUserService_1 = require("./asyncUserService");
const useCaseService_1 = require("./useCaseService");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, asyncUserService_1.listUsers)();
    res.json(users);
}));
app.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, asyncUserService_1.getUserById)(req.params.id);
    if (!user)
        return res.status(404).send("Usuario no encontrado");
    return res.json(user);
}));
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).send("Nombre y edad son requeridos");
    }
    const user = yield (0, asyncUserService_1.createUser)(name, age);
    return res.status(201).json(user);
}));
app.put('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newName } = req.body;
    const user = yield (0, asyncUserService_1.updateUserName)(req.params.id, newName);
    if (!user)
        return res.status(404).send("Usuario no encontrado");
    return res.json(user);
}));
/*--------------------STUDENTS--------------------------*/
app.get('/students', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield (0, useCaseService_1.getAllStudents)();
    res.json(students);
}));
app.post('/students', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname } = req.body;
    const student = yield (0, useCaseService_1.addStudent)(name, lastname);
    return res.status(201).json(student);
}));
app.put('/students/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newName, newLastName } = req.body;
    const student = yield (0, useCaseService_1.updateStudent)(req.params.id, newName, newLastName);
    return res.status(200).json(student);
}));
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
