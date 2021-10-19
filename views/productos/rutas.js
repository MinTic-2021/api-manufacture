import Express from 'express'
import { queryAllproductos, crearProducto, editarProducto, eliminarProducto } from '../../controllers/productctr.js'

const rutasProductos = Express.Router()

const genericCallback = (res) => {
    return  (err, resultado) => {
        if(err){
            res.sendStatus(500).send("Error consultando los Productos") //Envia un mensaje de error si falla
        }else{
            res.json(resultado) // envia en formato json el resultado obtenido al consultar la bd
        }
    }
} 

rutasProductos.route('/gprod').get((req, res) => {
    queryAllproductos(genericCallback(res))
})

rutasProductos.route('/gprod').post((req, res) => {
   crearProducto(req.body, genericCallback(res))
})

rutasProductos.route('/gprod/:id').patch((req, res) => {
    editarProducto(req.params.id, req.body, genericCallback(res))
})

rutasProductos.route('/gprod/:id').delete((req, res) => {
   eliminarProducto(req.params.id, genericCallback(res))
})

export default rutasProductos