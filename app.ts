import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import router from "./routes/User_register"; // Asumiendo que tienes un router configurado

dotenv.config();

const app = express().use(bodyParser.json());

// Ruta para manejar el registro de usuarios
app.use('/user_register', router);

const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`API listening at http://localhost:${PORT}`);
});
