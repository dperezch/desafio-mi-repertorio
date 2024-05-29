const { Pool } = require('pg');

const config = {
    user : process.env.USERDB,
    host : process.env.HOSTDB,
    database : process.env.DATABASE,
    password :  process.env.PASSWORD,
    port : process.env.PORT
}

const pool = new Pool(config);

const agregarCancion = async ({titulo,artista,tono})=>{
    try {
        const text = `INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3)`;
        const values = [titulo, artista, tono];
        const queryObject = {
            text,
            values
        }
        const result = await pool.query(queryObject);
        return result;
    } catch ({code}) {
        console.error(`Error: ${code}`);
    }
};

const obtenerCanciones = async ()=>{
    try {
        const text = `SELECT * FROM canciones`;
        const queryObject = {
            text
        }
        const result = await pool.query(queryObject);
        return result;
    } catch ({code}) {
        console.error(`Error: ${code}`);
    }
}

const editarCancion = async ({id,titulo,artista,tono})=>{
    try {
        const text = `UPDATE canciones SET titulo=$2, artista=$3, tono=$4 WHERE id = $1`;
        const values = [id, titulo, artista, tono];
        const queryObject = {
            text,
            values
        }
        const result = await pool.query(queryObject);
        return result;
    } catch ({code}) {
        console.error(`Error: ${code}`);
    }
}

const eliminarCancion = async (id)=>{
    try {
        text = `DELETE FROM canciones WHERE id = $1 RETURNING *`;
        values = [id];
        const queryObject = {
            text,
            values
        }
        const result = await pool.query(queryObject);
        return result;
    } catch ({code}) {
        console.log(`Error: ${code}`);
    }
}


module.exports = {
    agregarCancion,
    obtenerCanciones,
    editarCancion,
    eliminarCancion
}