import db from '@/config/db';
import { User } from '@/models/User/User';



async function createEntrepreneurRepository(newUser: User) {
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();
        

        const [usuarioResult]: any = await connection.execute(
            `INSERT INTO usuario (nombre, correo, contraseña, telefono, verificado, rol, estado)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                newUser.name,
                newUser.email,
                newUser.password,
                newUser.phone,
                newUser.verified,
                newUser.role,
                newUser.status = 'Pendiente'
            ]
        );
        const name_farm = newUser.name_farm

        const emprendedorId = usuarioResult.insertId;

        await connection.execute(
            `INSERT INTO finca (nombre, emprendedor_id)
       VALUES (?, ?)`,
            [
                name_farm,
                emprendedorId,
            ]
        );

        await connection.commit();
        return { success: true, emprendedorId };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export default createEntrepreneurRepository;
