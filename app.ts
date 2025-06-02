import 'module-alias/register';
import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import './src/controllers/User/removeUnverifiedUsersController';

import userRoutes from "@/routes/User/userRoutes";
import authRoutes from "@/routes/Auth/authRoutes";
import productRoutes from "@/routes/Product/productRoutes";
import farmRoutes from "@/routes/Farm/FarmRoutes";
import reviewsRoutes from "@/routes/Comments/reviewsRoutes";
import dashboardRoutes from "@/routes/Dashboard/dashboardRoutes";
import imageRoutes from "@/routes/Azure/imageRoutes";
// import cartRoutes from "./src/routes/Cart/cartRoutes"

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ['Set-Cookie']
}));

// Configuración de cookies
app.use(cookieParser(process.env.JWT_ACCESS_SECRET));
app.use(bodyParser.json());
app.use(express.json());

// 🟢 Rutas
app.use('/usuario', userRoutes);
app.use('/auth', authRoutes);
// app.use('/carrito', cartRoutes);
app.use('/productos', productRoutes);
app.use('/fincas', farmRoutes);
app.use('/dashboard', dashboardRoutes);
/* app.use('/pagos', payRoutes ); 
app.use('/paquete', /* packRoutes );   */
app.use('/comentarios', reviewsRoutes);
app.use('/images', imageRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


