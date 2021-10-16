// Se encarga de la conexión a la base de datos 

import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config({patch: './.env'})
const stringConexion = process.env.URL_DATABASE

let conexion

const client = new MongoClient(stringConexion, {
    useNewurlParser: true,
    useUnifiedTopology: true,
})

const conectarBD = (callback) =>{
    client.connect((err, db) => {
        if(err){
            console.error('Error conectando a la base de datos')
        }
        conexion = db.db('Tienda')
        console.log('Conexión exitosa')
        return callback()
    })
}

const getBD = () => {
    return conexion
}

export { conectarBD, getBD }