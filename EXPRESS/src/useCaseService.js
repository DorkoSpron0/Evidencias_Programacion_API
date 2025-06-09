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
exports.getAllStudents = getAllStudents;
exports.addStudent = addStudent;
exports.updateStudent = updateStudent;
const promises_1 = __importDefault(require("fs/promises"));
const uuid_1 = require("uuid");
const FILE_PATH = './src/students.json';
function getAllStudents() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield promises_1.default.readFile(FILE_PATH, 'utf-8');
            return JSON.parse(data);
        }
        catch (_a) {
            return [];
        }
    });
}
function addStudent(name, lastname) {
    return __awaiter(this, void 0, void 0, function* () {
        const students = yield getAllStudents();
        const newStudent = { id: (0, uuid_1.v4)(), name, lastname };
        students.push(newStudent);
        yield promises_1.default.writeFile(FILE_PATH, JSON.stringify(students, null, 2));
        return newStudent;
    });
}
function updateStudent(id, newName, newLastname) {
    return __awaiter(this, void 0, void 0, function* () {
        const students = yield getAllStudents();
        const student = students.find(u => u.id === id);
        if (student) {
            student.name = newName;
            student.lastname = newLastname;
            yield promises_1.default.writeFile(FILE_PATH, JSON.stringify(students, null, 2));
            return student;
        }
    });
}
