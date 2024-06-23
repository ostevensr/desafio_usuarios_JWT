import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

const validaToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).json({ error: 'No existe Token' });
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(500).json({ error: 'Error al autenticr Token' });
      }
      req.userEmail = decoded.email;
      next();
    });
  };

export {validaToken}