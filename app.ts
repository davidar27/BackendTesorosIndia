import express from 'express';
import cartRoutes from './routes/cartRoutes';

const app = express();
app.use(express.json());

app.use('/cart', cartRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
