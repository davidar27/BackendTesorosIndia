import { User } from '@/models/User/User';
import { findByEmailUserService } from './findByEmailUserService';
import db from '@/config/db';
import bcrypt from 'bcryptjs';

export const createUserService = async (userData: User): Promise<User> => {
    const connection = await db.getConnection();
    
    try {
        // Verificar si el email ya existe
        const existingUser = await findByEmailUserService(userData.email);
        if (existingUser) {
            throw new Error('El correo electrónico ya está registrado');
        }

        await connection.beginTransaction();

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // Insertar usuario
        const [result]: any = await connection.execute(
            `INSERT INTO usuario (nombre, correo, contraseña, telefono, rol, verificado, imagen, descripcion, direccion) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userData.name,
                userData.email,
                hashedPassword,
                userData.phone,
                userData.role,
                userData.verified,
                userData.image || null,
                userData.description || null,
                userData.address || null
            ]
        );

        const userId = result.insertId;

        // Obtener el usuario creado
        const [rows]: any = await connection.execute(
            `SELECT usuario_id, nombre, correo, telefono, rol, verificado, imagen, descripcion, direccion 
             FROM usuario WHERE usuario_id = ?`,
            [userId]
        );

        await connection.commit();

        // Crear y retornar una nueva instancia de User con los datos de la base de datos
        const userFromDb = rows[0];
        return new User({
            userId: userFromDb.usuario_id,
            name: userFromDb.nombre,
            email: userFromDb.correo,
            password: '', // No devolvemos la contraseña
            phone: userFromDb.telefono,
            role: userFromDb.rol,
            verified: Boolean(userFromDb.verificado),
            image: userFromDb.imagen || '',
            description: userFromDb.descripcion,
            address: userFromDb.direccion,
            token_version: 0
        });
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}; 