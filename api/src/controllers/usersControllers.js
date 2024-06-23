import {userModel,loginModel,getusersModel} from '../models/users.models.js'

export const registraUser = async (req,res) =>{
    try {
        const {email, password, rol, lenguage} = req.body;
        const nuevoUser = await userModel({email, password, rol, lenguage});
        res.status(201).json({post: nuevoUser});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginResult = await loginModel({ email, password });
        res.status(200).json(loginResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUsers = async(req,res) => {
    try {
        const usuarios = await getusersModel();
        res.status(200).json({usuarios: usuarios});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};