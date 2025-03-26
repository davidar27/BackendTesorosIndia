import mysql from 'mysql2/promise';
const dotenv = require('dotenv');

dotenv.config();

export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10, 
    queueLimit: 0,       
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Conected to database');
        connection.release(); 
    } catch (err) {
        console.error('Error connecting:', err);
    }
})();