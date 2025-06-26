import { Member } from "@/models/Experience/Member";
import { deleteMemberRepository } from "@/repositories/Experience/Member/deleteMemberRepository";
import { getMemberRepository } from "@/repositories/Experience/Member/getMemberRepository";
import { deleteFromAzureService } from "@/services/Azure/deleteFromAzureService";

export const deleteMemberService = async (member_id: number) => {
    const member: Member = await getMemberRepository(member_id)
    await deleteFromAzureService(member.image as string)
    await deleteMemberRepository(member_id);
}; 