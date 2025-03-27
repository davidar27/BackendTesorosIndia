import pool from '../../config/db'

const query = async (sql: string, params?: any[]): Promise<any> => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(sql, params);
        return rows;
    } finally {
        connection.release();
    }
};

export { query };