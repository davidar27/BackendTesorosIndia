import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import authRouter from "./routes/Auth/authRoutes";
import user from "./routes/User/User";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express().use(bodyParser.json());
app.use(cookieParser());

app.use('/user', user);
app.use('/admin', user,)
app.use('/user', authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API listening at http://localhost:${PORT}`);
});