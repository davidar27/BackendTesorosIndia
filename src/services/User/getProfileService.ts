import { getProfileRepository } from "@/repositories/User/getProfileRepository";
import { formatImageUrl } from "@/helpers/User/formatImageUrl";

export const getProfileService = async (id: number) => {
    const profile = await getProfileRepository(id);
    if (!profile) return null;

    return {
        ...profile,
        image: profile.image ? formatImageUrl(profile.image) : null
    };
};
