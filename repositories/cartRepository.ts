import { db } from '../config/db';

export class CartRepository {

    // Agrega un producto al carrito.
    public static async addProduct(userId: number, productId: number, quantity: number): Promise<void> {
        const [existingItem] = await db.query(
            'SELECT * FROM carrito WHERE cliente_id = ? AND producto_id = ?',
            [userId, productId]
        );

        if ((existingItem as any[]).length > 0) {
            await db.query(
                'UPDATE carrito SET cantidad = cantidad + ? WHERE cliente_id = ? AND producto_id = ?',
                [quantity, userId, productId]
            );
        } else {
            await db.query(
                'INSERT INTO carrito (cliente_id, producto_id, cantidad) VALUES (?, ?, ?)',
                [userId, productId, quantity]
            );
        }
    }


    // Actualiza la cantidad de un producto en el carrito.
    public static async updateQuantity(userId: number, productId: number, quantity: number): Promise<void> {
        await db.query(
            'UPDATE carrito SET cantidad = ? WHERE cliente_id = ? AND producto_id = ?',
            [quantity, userId, productId]
        );
    }

    // Elimina un producto del carrito.
    public static async deleteProduct(userId: number, productId: number): Promise<void> {
        await db.query(
            'DELETE FROM carrito WHERE cliente_id = ? AND producto_id = ?',
            [userId, productId]
        );
    }

    // Vacía el carrito.
    public static async emptyCart(userId: number): Promise<void> {
        await db.query('DELETE FROM carrito WHERE cliente_id = ?', [userId]);
    }

    // Obtiene el contenido del carrito.
    public static async getCart(userId: number): Promise<any[]> {
        const [rows] = await db.query(
            'SELECT c.producto_id, c.cantidad, p.nombre, p.descripcion, p.precio ' +
            'FROM carrito c ' +
            'INNER JOIN producto p ON c.producto_id = p.producto_id ' +
            'WHERE c.cliente_id = ?',
            [userId]
        );
        return rows as any[];
    }

    // Obtiene el producto para la verificación de stock
    public static async getProduct(productId: number): Promise<any> {
        const [rows] = await db.query(
            'SELECT * FROM producto WHERE producto_id = ?',
            [productId]
        );
        return rows as any[]; 
    }
}