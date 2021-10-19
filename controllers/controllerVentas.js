import { getBD } from "../db/db.js"
import { ObjectId } from "mongodb"

const queryAllVentas = async (callback) => {
    const conexion = getBD()
    await conexion
    .collection('ventas')
    .find({})
    .toArray(callback) // toArray convierte los resultados de la búsqueda en un array
}

const crearVentas = async (nuevo, callback) => {
    const conexion = getBD()
    await conexion.collection('ventas').insertOne(nuevo, callback)
}

const editarVentas = async (id, edicion, callback) => {
    const ventaAactualizar = { _id: new ObjectId(id) }
    console.log("venta a Actualizar: ", id)
    const operacion = {
        $set: edicion,
    }
    const conexion = getBD()
    await conexion
    .collection('ventas')
    .findOneAndUpdate(ventaAactualizar, operacion, { upsert: true }, callback)
}

const eliminarVentas = async(id, callback) => {
    const ventaAeliminar = { _id: new ObjectId(id) }
    const conexion = getBD()
    conexion.collection('ventas').deleteOne(ventaAeliminar, callback)
}

export {queryAllVentas, crearVentas, editarVentas, eliminarVentas}