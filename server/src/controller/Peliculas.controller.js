import pool from '../database';


export const getPeliculas = async(req,res) =>{
    const peliculas = await pool.query('SELECT * FROM peliculas')
    res.json(peliculas)
}


export const getPeliculaById = async(req,res) =>{
    const { id } = req.params;

    const pelicula = await pool.query('SELECT * FROM peliculas WHERE id = ?',[id]);
    if(pelicula.length > 0 ){
        return res.json(pelicula)
    }
    res.status(404).json({message:"La pelicula no se encuentra en la base datos"})
}

export const addPelicula = async(req,res) =>{
    const { nombre,descripcion,categoria,url,urlfondo,urldescarga } = req.body;
    const newPelicula = {
        nombre,
        descripcion,
        categoria,
        url,
        urlfondo,
        urldescarga
    }
    await pool.query('INSERT INTO peliculas set ?',[newPelicula])
    res.status(201).json(newPelicula)
}

export const editPelicula = async(req,res)=>{
    const {id} = req.params;
    const { nombre,descripcion,categoria,url,urlfondo,urldescarga} = req.body;
    const updatePelicula = {
        nombre,
        descripcion,
        categoria,
        url,
        urlfondo,
        urldescarga
    }
    await pool.query('UPDATE peliculas set ? WHERE id = ?',[updatePelicula,id])
    res.status(204).json()
}



export const deletePeliculaById = async(req,res) =>{
    const { id } = req.params;
    await pool.query('DELETE FROM peliculas WHERE id = ? ',[id])
    res.status(204).json()
}