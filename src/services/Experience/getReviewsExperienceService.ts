import { getReviewsExperienceRepository } from "@/repositories/Experience/getReviewsExperienceRepository";
import { getStatsReviewsExperienceRepository } from "@/repositories/Experience/getStatsReviewsExperienceRepository";

export const getReviewsExperienceService = async (experience_id: number) => {
    const stats = await getStatsReviewsExperienceRepository(experience_id);
    const reviews = await getReviewsExperienceRepository(experience_id);
    return { stats: stats, reviews: reviews }
}; 