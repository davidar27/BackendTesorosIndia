import { Member } from "@/models/Experience/Member";
import { deleteMemberRepository } from "@/repositories/Experience/Member/deleteMemberRepository";
import { getMemberRepository } from "@/repositories/Experience/Member/getMemberRepository";
import { deleteFromAzureService } from "@/services/Azure/deleteFromAzureService";

export const deleteMemberService = async (memberId: number) => {
    const member = await getMemberRepository(memberId)    
    await deleteFromAzureService(member.image as string)
    await deleteMemberRepository(memberId);
}; 