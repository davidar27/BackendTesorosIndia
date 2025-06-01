import db from '@/config/db';


const updateUserPasswordRepository = async (email: string, password: string) => {
    const sql = `UPDATE usuario SET contraseña = ? WHERE correo = ?`;
    const values = [password, email];
    await db.execute(sql, values);


}

export default updateUserPasswordRepository;
