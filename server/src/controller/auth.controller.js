import pool from '../database'
import encrypt from '../libs/encrypt'
import jwt from 'jsonwebtoken'
import config from '../config'


export const signin = async (req,res) =>{
    const { email,password } = req.body;
    const comprabando = await pool.query('SELECT * FROM users WHERE email = ?',[email.toLowerCase()])
    if(comprabando.length > 0){
        const user = comprabando[0];
        const validPassword = await encrypt.matchPassword(password,user.password)
        if(validPassword){
            const token = jwt.sign({email:email, password},config.SECRET)
            return res.status(200).json({token})
        }else{
            return res.status(404).json({error:"Contraseña incorrecta"})
        }

    }
    res.status(404).json({error:"El email no esta registrado"})
}

export const signup = async (req,res) =>{
    const { nombre,email,password } = req.body;
    const comprabando = await pool.query('SELECT * FROM users WHERE email = ?',[email.toLowerCase()])
    if(comprabando.length > 0){
        return res.json({error:"El email ya se encuentra registrado"})
    }
    const passwordEncrypt = await encrypt.encryptPassword(password)
    const newUser = {
        nombre,
        email:email.toLowerCase(),
        password: passwordEncrypt,
        rol: 'normal'
    }
    const token = jwt.sign({email:newUser.email,password:passwordEncrypt},config.SECRET)  
    await pool.query('INSERT INTO users set ?',[newUser])
    res.json({token}) 
}

export const signupAdmin = async(req,res) =>{
    const { nombre,email,password, clave } = req.body;
    if(clave === undefined){
       return res.status(404).json({error:"Necesitas la clave secreta para poder agregar otro administrador"})
    }
    if(clave === config.CLAVE){
        const comprabando = await pool.query('SELECT * FROM users WHERE email = ?',[email.toLowerCase()])
        if(comprabando.length > 0 ){
            return res.json({error:"El email ya se encuentra registrado"})
        }
        const passwordEncrypt = await encrypt.encryptPassword(password)
        const newAdmin = {
            nombre,
            email : email.toLowerCase(),
            password: passwordEncrypt,
            rol: 'admin'
        }
        const token = jwt.sign({email:newAdmin.email, pasword:newAdmin.pasword},config.SECRET)
        await pool.query('INSERT INTO users set ? ',[newAdmin])
        return res.status(200).json({token})
    }
    res.status(404).json({error:"La clave es incorrecta"})
   
}

export const whoami = async(req,res) =>{
	const token = req.headers["x-access-token"];
	if(!token) return res.status(404).json({error:"No hay token no puedes entrar"})
	try{
		const verify = jwt.verify(token,config.SECRET)
		const comprabando = await pool.query('SELECT * FROM users WHERE email = ?',[verify.email])
		if(comprabando.length > 0){
			const datos = {
				id:comprabando[0].id,
				nombre:comprabando[0].nombre,
				email:comprabando[0].email,
				rol:comprabando[0].rol
			}
			return res.status(200).json(datos)
		}
	}catch(e){
			res.status(401).json({error:"Token invalido"})
	}
}

