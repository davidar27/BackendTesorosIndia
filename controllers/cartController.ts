import { Request, Response } from 'express';
import { CartService } from '../services/cartService';

const cartService = new CartService();

// Agregar un producto al carrito.
export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId, quantity } = req.body;
    await cartService.addProductCart(userId, productId, quantity);
    res.status(200).send('Producto agregado al carrito!');
  } catch (error) {
    res.status(400).send(error || 'Error al agregar el producto al carrito.');
  }
};

// Consultar el contenido del carrito.
export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.query;
    const cart = await cartService.getCart(Number(userId));
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).send(error || 'Error al consultar el carrito.');
  }
};

// Actualizar la cantidad de un producto en el carrito.
export const updateQuantity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId, quantity } = req.body;
    await cartService.updateQuantityCart(userId, productId, quantity);
    res.status(200).send('Cantidad actualizada en el carrito!');
  } catch (error) {
    res.status(400).send(error || 'Error al actualizar la cantidad.');
  }
};

// Eliminar un producto del carrito.
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId } = req.body;
    await cartService.deleteProductCart(userId, productId);
    res.status(200).send('Producto eliminado del carrito!');
  } catch (error) {
    res.status(400).send(error || 'Error al eliminar el producto.');
  }
};

// Vaciar el carrito.
export const emptyCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;
    await cartService.emptyCart(userId);
    res.status(200).send('Carrito vacio!');
  } catch (error) {
    res.status(400).send(error || 'Error al vaciar el carrito.');
  }
};