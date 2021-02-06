import mysql from 'mysql';
import  { database } from './keys'
import { promisify } from 'util'

const pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('la conexion a la base de datos fue cerrada');
        }
        if(err.code  === 'ER_CON_COUNT_ERROR'){
            console.error('La base de datos tiene varias conexiones');
        }
        if(err.code === 'ENCONNREFUSED'){
            console.error('La conexion a la base de datos fue rechazada');
        }        
    }
    if(connection) connection.release();
    console.log('DB conectada');
    return;
});

pool.query = promisify(pool.query)

export default pool