import { getPackageEntrepreneursRepository } from "@/repositories/Package/getPackageEntrepreneursRepository";
import { getItemsBillRepository } from "@/repositories/payment/getItemsBillRepository";
import { getBillProductEntrepreneurRepository } from "@/repositories/Product/getProductEntrepreneurRepository";

export async function getBuyEntrepreneursService(bill_id: number) {
    const itemsBill = await getItemsBillRepository(bill_id)
    const itemType = itemsBill[0].type
    if (itemType == "producto") {
        return await getBillProductEntrepreneurRepository(bill_id)
    }
    return await getPackageEntrepreneursRepository(itemsBill[0].item_id)
}