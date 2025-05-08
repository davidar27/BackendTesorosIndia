import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";

import cartRoutes from "./src/routes/cart/cartRoutes";
import userRoutes from "./src/routes/User/userRoutes";
import authRoutes from "./src/routes/Auth/authRoutes";
import productRoutes from "./src/routes/Product/productRoutes";
import farmRoutes from "./src/routes/Farm/FarmRoutes";
import reviewsRoutes from "./src/routes/Comments/reviewsRoutes";

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://fronted-tesoros-india.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

// 🟢 Rutas
app.use('/usuario', userRoutes);
app.use('/auth', authRoutes);
app.use('/carrito', cartRoutes);
app.use('/productos', productRoutes);
app.use('/fincas', farmRoutes);
/* app.use('/pagos', payRoutes ); 
app.use('/paquete', /* packRoutes );   */
app.use('/comentarios', reviewsRoutes);

// 🔵 Inicia servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
