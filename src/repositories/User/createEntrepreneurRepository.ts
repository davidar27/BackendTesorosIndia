import db from '../../config/db';
import { Farm } from '../../models/Farm/Farm';
import { User } from '../../models/User/User';



async function crearEmprendedorConFinca(newUser: User, newFarm: Farm) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [usuarioResult]: any = await connection.execute(
            `INSERT INTO usuario (nombre, correo, contraseña, telefono, verificado, rol)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [
                newUser.name,
                newUser.email,
                newUser.password,
                newUser.phone_number,
                newUser.verified,
                newUser.role,
            ]
        );

        const emprendedorId = usuarioResult.insertId;

        await connection.execute(
            `INSERT INTO finca (nombre, emprendedor_id)
       VALUES (?, ?)`,
            [
                newFarm.name,
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

export default crearEmprendedorConFinca;
