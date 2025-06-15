import { getEntrepreneursRepository } from "@/repositories/User/getEntrepreneurRepository";
import { formatImageUrl } from "@/helpers/User/formatImageUrl";

interface Entrepreneur {
    id: number;
    name: string;
    age: number;
    role: string;
    image: string | null;
}

export const getEntrepreneurService = async () => {
    const entreprenaurs = await getEntrepreneursRepository();
    return entreprenaurs.map((entreprenaur: Entrepreneur) => ({
        ...entreprenaur,
        image: entreprenaur.image ? formatImageUrl(entreprenaur.image) : null
    })); 

}; 