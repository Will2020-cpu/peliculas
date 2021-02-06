import jwt from 'jsonwebtoken';
import pool from '../database'
import config from '../config'


export const verifyToken = async(req,res,next) =>{
    const token = req.headers['x-access-token'];
    if(!token) return res.status(403).json({error:"No hay token no pasaras por aqui :("})
    try{
        const pase =jwt.verify(token,config.SECRET)
        req.user = pase.email
        const comprobando = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?',[pase.email,pase.password])
        if(comprobando.length < 0) return res.json({error:"Este usuario no existe en la base de datos"})
    }catch(e){
        return res.status(403).json({message:"Este token es invalido"})
    }
    next();
}

export const verifyRol = async(req,res,next) =>{
    const row = await pool.query('SELECT * FROM users WHERE email = ?',[req.user])
    if(row.length > 0){
        if(row[0].rol === 'normal'){
            return res.status(403).json({error: "forbidden"})
        }
    }else{
        return res.status(403).json({error: "nice try"})
    }
    next()
}