import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cartRoutes from "./routes/cart/cartRoutes"
import userRoutes from "./routes/User/userRoutes"
import authRoutes from "./routes/Auth/authRoutes"
import productRoutes from "./routes/Product/productRoutes"
import { checkRole } from "./middleware/Auth/checkRole";


dotenv.config();


const app = express().use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes, checkRole('cliente'));
app.use('/product', productRoutes );



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});