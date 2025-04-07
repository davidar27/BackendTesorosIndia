import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cartRoutes from "./src/routes/cart/cartRoutes"
import userRoutes from "./src/routes/User/userRoutes"
import authRoutes from "./src/routes/Auth/authRoutes"
import productRoutes from "./src/routes/Product/productRoutes"
import contentRputes from "./src/routes/Content/contentRoutes"


dotenv.config();



const app = express().use(bodyParser.json());


app.use(cookieParser());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/product', productRoutes );
app.use('/content',contentRputes)




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});