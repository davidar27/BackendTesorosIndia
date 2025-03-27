import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import authRouter from "./routes/Auth/authRoutes";
import user from "./routes/User/User";
import cookieParser from "cookie-parser";


dotenv.config();
import cartRoutes from './routes/cartRoutes';

const app = express().use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use('/user', user);
app.use('/admin', user,)
app.use('/user', authRouter);
app.use('/cart', cartRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});