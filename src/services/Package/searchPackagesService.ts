import { searchPackagesRepository, SearchPackageResult } from '@/repositories/Package/searchPackagesRepository';

export const searchPackagesService = async (searchTerm: string): Promise<SearchPackageResult[]> => {
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

        const results = await searchPackagesRepository(cleanSearchTerm);
        return results;
    } catch (error) {
        console.error('Error en searchPackagesService:', error);
        throw new Error('Error al buscar paquetes');
    }
}; 