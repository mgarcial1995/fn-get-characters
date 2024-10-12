import dbConfig from '../config/dbconfig';
import axios from 'axios';
import { get } from 'http';
import { Character } from '../model/Character';

import { APIGatewayProxyHandler } from 'aws-lambda';

const getByName: APIGatewayProxyHandler  = async (event) => {
  try {
    const name = event.pathParameters?.name
    const connection = await dbConfig.getConnection()
    let response: Character | null = null; 
    console.log("nombre---------->", name)
    // Consulta a la base de datos
    const query = `SELECT * FROM characters WHERE LOWER(nombre) LIKE LOWER(CONCAT('%', ?, '%'));`;
    const [rows]: any = await connection.query(query, [name]);
    
    if (rows.length > 0) {
      const char = rows[0];
      response = {
        nombre: char.nombre,
        altura: char.altura,
        peso: char.peso
      };
    } else {
      const res = await axios.get(`https://swapi.py4e.com/api/people/?search=${name}`);
      if (res.data.results.length > 0) {
        const chardata = res.data.results[0];
        response = {
          nombre: chardata.name,
          altura: chardata.height,
          peso: chardata.mass
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Personaje no encontrado' }),
        };
      }
    }

    connection.release();

    return {
      statusCode: 200,
      body: JSON.stringify({
        characterData: response
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
  handler: getByName
}