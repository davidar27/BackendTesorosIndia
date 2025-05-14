import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";

import userRoutes from "./src/routes/User/userRoutes";
import authRoutes from "./src/routes/Auth/authRoutes";
import productRoutes from "./src/routes/Product/productRoutes";
import farmRoutes from "./src/routes/Farm/FarmRoutes";
import reviewsRoutes from "./src/routes/Comments/reviewsRoutes";
// import cartRoutes from "./src/routes/Cart/cartRoutes"

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}



const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ['set-cookie']
}));


app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

// 🟢 Rutas
app.use('/usuario', userRoutes);
app.use('/auth', authRoutes);
// app.use('/carrito', cartRoutes);
app.use('/productos', productRoutes);
app.use('/fincas', farmRoutes);
/* app.use('/pagos', payRoutes ); 
app.use('/paquete', /* packRoutes );   */
app.use('/comentarios', reviewsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
