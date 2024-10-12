import dbConfig from '../config/dbconfig';
import axios from 'axios';
import { get } from 'http';
import { Character } from '../model/Character';

import { APIGatewayProxyHandler } from 'aws-lambda';

const getCharacters: APIGatewayProxyHandler  = async (event) => {
  try {
    const connection = await dbConfig.getConnection()

    // Consulta a la base de datos
    const query = `SELECT * FROM characters`;
    const [rows]: any = await connection.query(query);

    connection.release();

    return {
      statusCode: 200,
      body: JSON.stringify({
        charactersData: rows
      }),
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching data' }),
    };
  }
};

module.exports = {
  handler: getCharacters
}