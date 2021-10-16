import Express from 'express'
import { queryAllUsers, crearUsuario } from '../../controllers/controller.js'
import { getBD } from '../../db/db.js'

const rutasUsuarios = Express.Router()

const genericCallback = (res) => {
    return  (err, resultado) => {
        if(err){
            res.sendStatus(500).send("Error consultando los usuarios") //Envia un mensaje de error si falla
        }else{
            res.json(resultado) // envia en formato json el resultado obtenido al consultar la bd
        }
    }
} 

rutasUsuarios.route('/gusu/admin').get((req, res) => {
    queryAllUsers(genericCallback(res))
})

rutasUsuarios.route('/gusu/nuevo').post((req, res) => {
   crearUsuario(req.body, genericCallback(res))
})

rutasUsuarios.route('/gusu/editar').patch((req, res) => {
    const edicion = req.body
    console.log(edicion)
    const usuarioAactualizar = { _id: new ObjectId(edicion._id) }
    console.log("usuario a Actualizar: ", usuarioAactualizar._id)
    delete edicion._id
    const operacion = {
        $set: edicion,
    }
    const conexion = getBD()
    conexion.collection('usuarios').findOneAndUpdate(usuarioAactualizar, operacion, { upsert: true }, (err, result) => {
        if(err){
            console.error("Error actualizando el usuario", err)
            res.sendStatus(500)
        }else{
            console.log('Usuario actualizado exitosamente')
            res.sendStatus(200)
        }
    })

})

rutasUsuarios.route('/gusu/eliminar').delete((req, res) => {
    const usuarioAeliminar = { _id: new ObjectId(req.body.id) }
    const conexion = getBD()
    conexion.collection('usuarios').deleteOne(usuarioAeliminar, (err, result) => {
        if(err){
            console.error(err)
            res.sendStatus(500)
        }else{
            res.sendStatus(200)
        }
    })
})

export default rutasUsuarios