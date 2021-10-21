import Express from 'express'
import { queryAllUsers, crearUsuario, editarUsuario, eliminarUsuario, consultarOCrearUsuario } from '../../controllers/controller.js'

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

rutasUsuarios.route('/gusu').get((req, res) => {
    queryAllUsers(genericCallback(res))
})

rutasUsuarios.route('/gusu/self').get((req, res) => {
    consultarOCrearUsuario(req, genericCallback(res))
})

rutasUsuarios.route('/gusu').post((req, res) => {
   crearUsuario(req.body, genericCallback(res))
})

rutasUsuarios.route('/gusu/:id').patch((req, res) => {
    editarUsuario(req.params.id, req.body, genericCallback(res))
})

rutasUsuarios.route('/gusu/:id').delete((req, res) => {
   eliminarUsuario(req.params.id, genericCallback(res))
})

export default rutasUsuarios