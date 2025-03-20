"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql2_1 = __importDefault(require("mysql2"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: true,
    },
};
var db = mysql2_1.default.createPool(dbConfig);
var checkDbConnection = function () {
    db.getConnection(function (err, connection) {
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
exports.default = db.promise();
