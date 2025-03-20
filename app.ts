import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import router from "./routes/User/User_register";


dotenv.config();

const app = express().use(bodyParser.json());

app.use('/user', router);
app.use('/auth', userAuth);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API listening at http://localhost:${PORT}`);
});