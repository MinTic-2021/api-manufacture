import Express from 'express'
import { queryAllVentas, crearVentas, editarVentas, eliminarVentas } from '../../controllers/controllerVentas.js'

const rutasVentas = Express.Router()

const genericCallback = (res) => {
    return  (err, resultado) => {
        if(err){
            res.sendStatus(500).send("Error consultando las ventas") //Envia un mensaje de error si falla
        }else{
            res.json(resultado) // envia en formato json el resultado obtenido al consultar la bd
        }
    }
} 

rutasVentas.route('/gvent').get((req, res) => {
    queryAllVentas(genericCallback(res))
})

rutasVentas.route('/gvent').post((req, res) => {
   crearVentas(req.body, genericCallback(res))
})

rutasVentas.route('/gvent/:id').patch((req, res) => {
    editarVentas(req.params.id, req.body, genericCallback(res))
})

rutasVentas.route('/gvent/:id').delete((req, res) => {
   eliminarVentas(req.params.id, genericCallback(res))
})

export default rutasVentas