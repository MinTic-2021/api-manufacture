import { getBD } from "../db/db.js"
import { ObjectId } from "mongodb"
import jwtDecode from "jwt-decode"

const queryAllUsers = async (callback) => {
    const conexion = getBD()
    await conexion
    .collection('usuarios')
    .find({})
    .toArray(callback) // toArray convierte los resultados de la búsqueda en un array
}

const consultarOCrearUsuario = async (req, callback) => {
    const token =  req.headers.authorization.split("Bearer ")[1]
    const user =  jwtDecode(token)['http://localhost/userData']

    const conexion = getBD()
    await conexion
    .collection('usuarios')
    .findOne({ email: user.email }, async(err, response) => {
        if(response){
            callback(err, response)
        }else{
            user.auth0ID = user._id
            delete user._id
            user.rol = 'inactivo'
            user.ingreso = new Date().toISOString().slice(0, 10)
            await crearUsuario(user, (err, respuesta) => callback(err, user))
        }
    })
}

const crearUsuario = async (nuevo, callback) => {
    const conexion = getBD()
    await conexion.collection('usuarios').insertOne(nuevo, callback)
}

const editarUsuario = async (id, edicion, callback) => {
    const usuarioAactualizar = { _id: new ObjectId(id) }
    console.log("usuario a Actualizar: ", id)
    const operacion = {
        $set: edicion,
    }
    const conexion = getBD()
    await conexion
    .collection('usuarios')
    .findOneAndUpdate(usuarioAactualizar, operacion, { upsert: true }, callback)
}

const eliminarUsuario = async(id, callback) => {
    const usuarioAeliminar = { _id: new ObjectId(id) }
    const conexion = getBD()
    conexion.collection('usuarios').deleteOne(usuarioAeliminar, callback)
}

export {queryAllUsers, crearUsuario, editarUsuario, eliminarUsuario, consultarOCrearUsuario}