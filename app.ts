import 'module-alias/register';
import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";

import userRoutes from "@/routes/User/userRoutes";
import authRoutes from "@/routes/Auth/authRoutes";
import productRoutes from "@/routes/Product/productRoutes";
import categoryRoutes from "@/routes/Category/categoryRoutes";
import packageRoutes from "@/routes/Package/packageRoutes";
import experienceRoutes from "@/routes/Experience/ExperienceRoutes";
import reviewsRoutes from "@/routes/Review/reviewRoutes";
import dashboardRoutes from "@/routes/Dashboard/dashboardRoutes";
import imageRoutes from "@/routes/Azure/imageRoutes";
import cartRoutes from "@/routes/Cart/cartRoutes"
import paymentRoutes from '@/routes/Payment/paymentRoutes';
import notificationRoutes from '@/routes/Notification/notificationRoutes';
import hostelRoutes from '@/routes/Hostel/hostelRoutes';
import reserveRoutes from '@/routes/Reserve/reserveRoutes';
import IARoutes from '@/routes/IA/IARoutes';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 200,
}));

// Configuración de cookies
app.use(cookieParser(process.env.JWT_ACCESS_SECRET));
app.use(bodyParser.json());
app.use(express.json());

// 🟢 Rutas
app.use('/usuario', userRoutes);
app.use('/auth', authRoutes);
app.use('/carrito',cartRoutes );
app.use('/productos', productRoutes);
app.use('/categorias', categoryRoutes);
app.use('/experiencias', experienceRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/pagos', paymentRoutes);
app.use('/paquetes', packageRoutes );
app.use('/comentarios', reviewsRoutes);
app.use('/notificaciones', notificationRoutes);
app.use('/hostales', hostelRoutes);
app.use('/reservas', reserveRoutes);
app.use('/IA', IARoutes);
app.use('/images', imageRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


