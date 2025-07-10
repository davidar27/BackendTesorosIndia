import { deleteReviewByIdRepository } from "@/repositories/Review/deleteReviewByIdRepository";
import { getReviewByIdRepository } from "@/repositories/Review/getReviewByIdRepository";
import { reportedReviewRepository } from "@/repositories/Review/reportedReviewRepository";

export const reportedReviewService = async (review_id: number, reportingUser: number) => {
    const review = await getReviewByIdRepository(review_id);
    if (review.break_rules + 1 == 5) {
        await deleteReviewByIdRepository(review_id)
        return "Valoracion eliminada por la cantidad de reportes."
    }
    const reporting_users = JSON.parse(review.reporting_users) || []
    if (reporting_users.includes(reportingUser)) {
        return "El reporte es valido pero este usuario ya ha reportado previamente."
    }
    reporting_users.push(reportingUser)
    await reportedReviewRepository(review_id, JSON.stringify(reporting_users));
    return `El mensaje ya posee ${review.break_rules + 1} reportes`
};