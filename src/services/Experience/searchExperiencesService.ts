import { searchExperiencesRepository, SearchExperienceResult } from '@/repositories/Experience/searchExperiencesRepository';

export const searchExperiencesService = async (searchTerm: string): Promise<SearchExperienceResult[]> => {
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

        const results = await searchExperiencesRepository(cleanSearchTerm);
        return results;
    } catch (error) {
        console.error('Error en searchExperiencesService:', error);
        throw new Error('Error al buscar experiencias');
    }
}; 