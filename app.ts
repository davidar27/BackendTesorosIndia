import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cartRoutes from "./routes/cart/cartRoutes"
import userRoutes from "./routes/User/userRoutes"
import authRoutes from "./routes/Auth/authRoutes"
import productRoutes from "./routes/Product/productRoutes"
import contentRputes from "./routes/Content/contentRoutes"
import reviewsRoutes from "./routes/Comments/reviewsRoutes"

dotenv.config();



const app = express().use(bodyParser.json());


app.use(cookieParser());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/product', productRoutes );
app.use('/content',contentRputes);
app.use('/reviews', reviewsRoutes)




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});