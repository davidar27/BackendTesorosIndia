import { getTotalIncomeByExperienceRepository } from '../../repositories/Experience/getTotalIncomeByExperienceRepository';

export async function getTotalIncomeByExperienceService(experiencia_id: number) {
    const total = await getTotalIncomeByExperienceRepository(experiencia_id);
    return total;
} 