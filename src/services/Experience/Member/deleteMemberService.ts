import { deleteMemberRepository } from "@/repositories/Experience/Member/deleteMemberRepository";

export const deleteMemberService = async (member_id: number) => {
    return await deleteMemberRepository(member_id);
}; 