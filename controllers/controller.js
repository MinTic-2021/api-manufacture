import { getBD } from "../db/db.js"
import { ObjectId } from "mongodb"

const queryAllUsers = async (callback) => {
    const conexion = getBD()
    await conexion
    .collection('usuarios')
    .find({})
    .toArray(callback) // toArray convierte los resultados de la búsqueda en un array
}

const crearUsuario = async (nuevo, callback) => {
    const conexion = getBD()
    await conexion.collection('usuarios').insertOne(nuevo, callback)
}

const editarUsuario = async (edicion, callback) => {
    const usuarioAactualizar = { _id: new ObjectId(edicion._id) }
    console.log("usuario a Actualizar: ", usuarioAactualizar._id)
    delete edicion._id
    const operacion = {
        $set: edicion,
    }
    const conexion = getBD()
    await conexion
    .collection('usuarios')
    .findOneAndUpdate(usuarioAactualizar, operacion, { upsert: true }, callback)
}

export {queryAllUsers, crearUsuario, editarUsuario}