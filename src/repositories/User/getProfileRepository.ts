import db from '@/config/db';

export interface UserProfile {
    id: number;
    name: string;
    age: number | null;
    profession: string | null;
    image: string | null;
    email: string;
    address: string | null;
    phone: string | null;
}

export const getProfileRepository = async (id: number): Promise<UserProfile | null> => {    
    const sql = `
    SELECT 
      u.usuario_id AS id,
      u.nombre AS name,
      u.edad AS age,
      u.profesion AS profession,
      u.imagen AS image,
      u.correo AS email,
      u.direccion AS address,
      u.telefono AS phone
    FROM usuario u
    WHERE u.usuario_id = ?
    LIMIT 1
  `;

    const [rows]: any = await db.execute(sql, [id]);

    if (rows.length === 0) {
        return null;
    }

    return rows[0] as UserProfile;
};
