export interface CartItem {
    productId: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    total: number; 
}

export interface Cart {
    userId: number;
    items: CartItem[]; // Lista de productos en el carrito
    totalAmount: number;
}