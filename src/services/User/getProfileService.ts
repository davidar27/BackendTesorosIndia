import { getProfileRepository } from "@/repositories/User/getProfileRepository";

export const getProfileService = async (id: number) => {
    const profile = await getProfileRepository(id);
    if (!profile) return null;

    return {
        ...profile,
        image: profile.image 
    };
};
