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
exports.createUser = createUser;
exports.listUsers = listUsers;
exports.getUserById = getUserById;
exports.updateUserName = updateUserName;
const promises_1 = __importDefault(require("fs/promises"));
const uuid_1 = require("uuid");
const FILE_PATH = './src/users.json';
function readUsers() {
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
function writeUsers(users) {
    return __awaiter(this, void 0, void 0, function* () {
        yield promises_1.default.writeFile(FILE_PATH, JSON.stringify(users, null, 2));
    });
}
function createUser(name, age) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield readUsers();
        const newUser = { id: (0, uuid_1.v4)(), name, age };
        users.push(newUser);
        yield writeUsers(users);
        return newUser;
    });
}
function listUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield readUsers();
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield readUsers();
        const user = users.find(u => u.id === id);
        if (user) {
            return user;
        }
    });
}
function updateUserName(id, newName) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield readUsers();
        const user = users.find(u => u.id === id);
        if (user) {
            user.name = newName;
            yield writeUsers(users);
            return user;
        }
    });
}
