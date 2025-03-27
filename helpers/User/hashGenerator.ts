import bcrypt from 'bcryptjs';

let GenerateHash = async(data: string) =>{
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(data, salt);
};

export default GenerateHash
