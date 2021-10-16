import Express from 'express'
import { queryAllUsers, crearUsuario, editarUsuario, eliminarUsuario } from '../../controllers/controller.js'

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
   eliminarUsuario(req.body.id, genericCallback(res))
})

export default rutasUsuarios