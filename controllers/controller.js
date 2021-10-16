import { getBD } from "../db/db.js"

const queryAllUsers = async (callback) => {
    const conexion = getBD()
    await conexion
    .collection('usuarios')
    .find({})
    .toArray(callback) // toArray convierte los resultados de la búsqueda en un array
}

const crearUsuario = async (nuevo, callback) => {
    const conexion = getBD()
    conexion.collection('usuarios').insertOne(nuevo, callback)
}

export {queryAllUsers, crearUsuario}