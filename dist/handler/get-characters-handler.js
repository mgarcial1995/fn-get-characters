"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../config/dbconfig"));
const getCharacters = async (event) => {
    try {
        const connection = await dbconfig_1.default.getConnection();
        // Consulta a la base de datos
        const query = `SELECT * FROM characters`;
        const [rows] = await connection.query(query);
        connection.release();
        return {
            statusCode: 200,
            body: JSON.stringify({
                charactersData: rows
            }),
        };
    }
    catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching data' }),
        };
    }
};
module.exports = {
    handler: getCharacters
};
