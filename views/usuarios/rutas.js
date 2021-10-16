import Express from 'express'
import { queryAllUsers, crearUsuario, editarUsuario } from '../../controllers/controller.js'
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
    editarUsuario(req.body, genericCallback(res))
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