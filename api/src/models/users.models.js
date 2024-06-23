import pool from '../../db/config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'key_secreta';

//Registrar Usuario

export const userModel = async (user) => {
    const { email, password, rol, lenguage } = user;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hashedPassword, rol, lenguage]
        );
        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error('Error creando Usuario:', error);
    }
};

//Login

export const loginModel = async (user) => {
    const { email, password } = user;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            throw new Error('Usuario no encontrado');
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }
        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        return { token }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

//Usuarios

export const getusersModel = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [req.userEmail]);
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'No existe Usuario' });
        }
        res.json(result.rows[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};
