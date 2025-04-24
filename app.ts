import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cartRoutes from "./src/routes/cart/cartRoutes"
import userRoutes from "./src/routes/User/userRoutes"
import authRoutes from "./src/routes/Auth/authRoutes"
import productRoutes from "./src/routes/Product/productRoutes"
import farmRoutes from "./src/routes/Farm/FarmRoutes"

dotenv.config();



const app = express().use(bodyParser.json());


app.use(cookieParser());
app.use(express.json());

app.use('/usuario', userRoutes);
app.use('/auth', authRoutes);
app.use('/carrito', cartRoutes);
app.use('/productos', productRoutes );
app.use('/fincas',farmRoutes);
app.use('/pagos', productRoutes );
app.use('/paquete',farmRoutes);





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});