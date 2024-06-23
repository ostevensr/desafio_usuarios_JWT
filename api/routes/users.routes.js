import { Router } from "express";
import {registraUser,loginUser,getUsers} from '../src/controllers/usersControllers.js';
import {validaCredentials} from '../middlewares/validaCredentials.js'
import {validaToken} from '../middlewares/validaToken.js'

const router = Router();

router.post('/usuarios', validaCredentials, registraUser);

router.post('/login', loginUser);

router.get('/usuarios', validaToken, getUsers);

router.all('*', (req,res) => {
    res.status(404).json({error: 'Página no encontrada'})
});

export default router;