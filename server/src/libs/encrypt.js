import bcrypt from 'bcryptjs';

const encrypt = {};


//Encriptando el password
encrypt.encryptPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    return hash;
}

//Desencripta y compara el password
encrypt.matchPassword = async(password,savedPassword) =>{
    try{
        return await bcrypt.compare(password,savedPassword)
    }catch(e){
        console.log(e)
    }
}

export default encrypt