import { query } from "../../helpers/db/query";


const deleteUserRepositories = async (user_id: number): Promise<void> => {
    const sql = 'DELETE FROM usuario WHERE usuario_id = ?';
    await query(sql, [user_id]);
};

export default deleteUserRepositories;