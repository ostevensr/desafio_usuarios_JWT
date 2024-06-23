import pg from 'pg';
import 'dotenv/config'

const {db_host,db_user,db_pass,db_database} = process.env;

const pool = new pg.Pool({
    host: db_host,
    user: db_user,
    password: db_pass,
    database: db_database,
    allowExitOnIdle: true
})

pool.query('SELECT NOW()', (error,respuesta) =>{
    if (error) {
        console.log("Error conectando a la base de datos:", error)
    } else {
        console.log("Base de Datos Conectada",respuesta.rows[0].now)
    }
});

export default pool;