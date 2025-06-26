import { Member } from "@/models/Experience/Member";
import { getMemberRepository } from "@/repositories/Experience/Member/getMemberRepository";
import { updateMemberRepository } from "@/repositories/Experience/Member/updateMemberRepository";
import { deleteFromAzureService } from "@/services/Azure/deleteFromAzureService";

export const updateMemberService = async (member: Member) => {
    const gettedMember: Member = await getMemberRepository(member.member_id as number)
    await deleteFromAzureService(gettedMember.image as string)
    return await updateMemberRepository(member);
}; 