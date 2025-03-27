import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();


const requiredEnvVars = ['DB_HOST', 'DB_USERNAME', 'DB_PASSWORD', 'DB_DATABASE'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Falta la variable de entorno: ${envVar}`);
    }
}

const dbConfig = {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: true,
    }
};

const db = mysql.createPool(dbConfig);

const checkDbConnection = (): void => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error("Error al conectar a la base de datos:", err.message);
            return;
        }
        console.log("Conectado a la base de datos con éxito!");
        connection.release();
    });
};

checkDbConnection();

export default db.promise();