import { Member } from "@/models/Experience/Member";
import { updateMemberRepository } from "@/repositories/Experience/Member/updateMemberRepository";

export const updateMemberService = async (member: Member) => {
    return await updateMemberRepository(member);
}; 