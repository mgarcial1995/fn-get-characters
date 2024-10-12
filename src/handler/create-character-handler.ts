import dbConfig from '../config/dbconfig';
import { Character } from '../model/Character';
import { APIGatewayProxyHandler } from 'aws-lambda';

const createCharacter: APIGatewayProxyHandler = async (event) => {
  try {
    const connection = await dbConfig.getConnection()

    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'No hay parametros' }),
        };
    }
    const body: Character = JSON.parse(event.body);
    const { nombre, peso, altura } = body;
    const [result] = await connection.execute(
        'INSERT INTO characters (nombre, peso, altura) VALUES (?, ?, ?)',
        [nombre, peso, altura]
    );
    
    connection.release()

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Character created",
        character: result
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching data' }),
    };
  }
};

module.exports = {
  handler: createCharacter
}