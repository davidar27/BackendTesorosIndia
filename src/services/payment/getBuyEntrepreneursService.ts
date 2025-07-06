import { getPackageEntrepreneursRepository } from "@/repositories/Package/getPackageEntrepreneursRepository";
import { getItemsBillRepository } from "@/repositories/payment/getItemsBillRepository";
import { getProductEntrepreneurRepository } from "@/repositories/Product/getProductEntrepreneurRepository";

export async function getBuyEntrepreneursService(bill_id: number) {
    const itemsBill = await getItemsBillRepository(bill_id)
    if (itemsBill.length > 1) {
        return itemsBill.map(async (i: any) => {
            return await getProductEntrepreneurRepository(i.item_id)
        });
    }
    return await getPackageEntrepreneursRepository(itemsBill[0].item_id)
}