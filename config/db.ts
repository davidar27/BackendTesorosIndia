import mysql from 'mysql2';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear la configuración de la base de datos
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    queueLimit: 0,
    /* ssl: {
        rejectUnauthorized: true,  // Si deseas validar el certificado del servidor
    }, */
};

// Crear el pool de conexiones
const db = mysql.createPool(dbConfig);

// Función para verificar la conexión
const checkDbConnection = () => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error("Error al conectar a la base de datos:", err.message);
            return;
        }
        console.log("Conectado a la base de datos con éxito!");
        connection.release();
    });
};

// Verificar la conexión
checkDbConnection();

// Exportar la conexión para usarla en otras partes del proyecto
export default db.promise();
