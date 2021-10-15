import Express from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'
import Cors from 'cors'

dotenv.config({patch: './.env'})
const stringConexion = process.env.URL_DATABASE

const client = new MongoClient(stringConexion, {
    useNewurlParser: true,
    useUnifiedTopology: true,
})

let conexion

const app = Express() // Crea servidor 

app.use(Cors()) // soluciona error de cors de la consola del front
app.use(Express.json()) // Convierte las solicitudes entrantes en formato json en un objeto manipulable 

app.get('/gusu/admin', (req, res) => {
    conexion.collection('usuarios').find({}).toArray((err, resultado) => { // se conecta a la bd usuarios, busca todos los items y los convierte en un array
        if(err){
            res.sendStatus(500).send("Error consultando los usuarios") //Envia un mensaje de error si falla
        }else{
            res.json(resultado) // envia en formato json el resultado obtenido al consultar la bd
        }
    })
})

app.post('/gusu/nuevo', (req, res) => {
    const nuevo = req.body
    
    try{
        if(Object.keys(nuevo).includes('nombre') &&
          Object.keys(nuevo).includes('rol')){ // validaciones de la información entrante 
            
            conexion.collection('usuarios').insertOne(nuevo, (err, res) => { 
                if(err){
                    console.error(err)
                    res.sendStatus(500)
                }else{
                    console.log(res)
                    res.sendStatus(200)
                }            
            })
            
            res.sendStatus(200) // si es correcta, manda el estatus ok
        }else{
              res.sendStatus(500) // si no las pasa, manda el estatus de error  
        }
    } catch{
        res.sendStatus(500)
    }

})

app.patch('/gusu/editar', (req, res) => {
    const edicion = req.body
    console.log(edicion)
    const usuarioAactualizar = { _id: new ObjectId(edicion._id) }
    console.log("usuario a Actualizar: ", usuarioAactualizar._id)
    delete edicion._id
    const operacion = {
        $set: edicion,
    }
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

app.delete('/gusu/eliminar', (req, res) => {
    const usuarioAeliminar = { _id: new ObjectId(req.body.id) }
    conexion.collection('usuarios').deleteOne(usuarioAeliminar, (err, result) => {
        if(err){
            console.error(err)
            res.sendStatus(500)
        }else{
            res.sendStatus(200)
        }
    })
})


const main = () => {
    client.connect((err, db) => {
        if(err){
            console.error('Error conectando a la base de datos')
        }
        conexion = db.db('Tienda')
        console.log('Conexión exitosa')
    })
    return(
            app.listen(process.env.PORT, () =>{ // Establece el puerto de escucha de solicitudes
            console.log(`Escuchando puerto ${process.env.PORT}`)
        })       
    )
}

main()