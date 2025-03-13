import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv"
import router from "./routes/User_register";
dotenv.config();

const app = express().use(bodyParser.json());

app.use('/User_register', router);

const PORT = process.env.PORT || 3000;