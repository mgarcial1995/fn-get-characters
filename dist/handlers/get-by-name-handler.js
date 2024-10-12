"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { APIGatewayProxyHandler } from 'aws-lambda';
const dbconfig_1 = require("../config/dbconfig");
const axios_1 = __importDefault(require("axios"));
const getByName = async (event) => {
    try {
        const name = event.name;
        const connection = await (0, dbconfig_1.dbConnection)();
        console.log(connection);
        // const [rows] = await connection.query('SELECT * FROM your_table');
        const res = await (0, axios_1.default)(`https://swapi.py4e.com/api/people/?search=${name}`);
        console.log(event);
        console.log(res);
        // const apiData = await res.json();
        return {
            statusCode: 200,
            body: JSON.stringify({
                // dbData: rows,
                res
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
exports.default = {
    handler: getByName
};
