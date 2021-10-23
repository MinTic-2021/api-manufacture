import { getBD } from "../db/db.js"
import { ObjectId } from "mongodb"

const queryAllproductos = async (callback) => {
    const conexion = getBD()
    await conexion
    .collection('Productos')
    .find({})
    .toArray(callback) // toArray convierte los resultados de la búsqueda en un array
}

const crearProducto = async (nuevo, callback) => {
    const conexion = getBD()
    await conexion.collection('Productos').insertOne(nuevo, callback)
}

const editarProducto = async (id, edicion, callback) => {
    const ProductoAactualizar = { _id: new ObjectId(id) }
    console.log("Producto a Actualizar: ", id)
    const operacion = {
        $set: edicion,
    }
    const conexion = getBD()
    await conexion
    .collection('Productos')
    .findOneAndUpdate(ProductoAactualizar, operacion, { upsert: true }, callback)
}

const eliminarProducto = async(id, callback) => {
    const ProductoAeliminar = { _id: new ObjectId(id) }
    const conexion = getBD()
    conexion.collection('Productos').deleteOne(ProductoAeliminar, callback)
}

export {queryAllproductos, crearProducto, editarProducto, eliminarProducto}