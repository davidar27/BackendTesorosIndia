"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const requiredEnvVars = ['DB_HOST', 'DB_USERNAME', 'DB_PASSWORD', 'DB_DATABASE'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Falta la variable de entorno: ${envVar}`);
    }
}
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: true,
    }
};
const db = mysql2_1.default.createPool(dbConfig);
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
checkDbConnection();
exports.default = db.promise();
