import Express from "express";
import bodyParser from 'body-parser';
import userAuth from './routes/authRoutes';
import dotenv from "dotenv";
dotenv.config();

const app = Express().use(bodyParser.json());

app.use('/auth', userAuth);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor ejecutándose en el puerto: ", PORT);
}).on("error", (error: any) => {
    throw new Error(error.message);
});
