import { searchProductsRepository, SearchProductResult } from '@/repositories/Product/searchProductsRepository';

export const searchProductsService = async (searchTerm: string): Promise<SearchProductResult[]> => {
    try {
        // Validar que el término de búsqueda no esté vacío
        if (!searchTerm || searchTerm.trim().length === 0) {
            return [];
        }

        // Limpiar el término de búsqueda
        const cleanSearchTerm = searchTerm.trim();
        
        // Si el término es muy corto, no realizar búsqueda
        if (cleanSearchTerm.length < 2) {
            return [];
        }

        const results = await searchProductsRepository(cleanSearchTerm);
        return results;
    } catch (error) {
        console.error('Error en searchProductsService:', error);
        throw new Error('Error al buscar productos');
    }
}; 