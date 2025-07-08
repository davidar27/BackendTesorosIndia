import { getEntrepreneursRepository } from "@/repositories/User/getEntrepreneurRepository";

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
        image: entreprenaur.image
    })); 

}; 