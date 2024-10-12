"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../config/dbconfig"));
const createCharacter = async (event) => {
    try {
        const connection = await dbconfig_1.default.getConnection();
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'No hay parametros' }),
            };
        }
        const body = JSON.parse(event.body);
        const { nombre, peso, altura } = body;
        const [result] = await connection.execute('INSERT INTO characters (nombre, peso, altura) VALUES (?, ?, ?)', [nombre, peso, altura]);
        connection.release();
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Character created",
                character: result
            }),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching data' }),
        };
    }
};
module.exports = {
    handler: createCharacter
};
