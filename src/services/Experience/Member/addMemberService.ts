import { Member } from "@/models/Experience/Member";
import { addMemberRepository } from "@/repositories/Experience/Member/addMemberRepository";

export const addMemberService = async (member: Member) => {
    return await addMemberRepository(member);
}; 