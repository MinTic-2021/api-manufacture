import Express from 'express'
import { conectarBD } from './db/db.js'
import dotenv from 'dotenv'
import Cors from 'cors'
import rutasUsuarios from './views/usuarios/rutas.js'
import rutasProductos from './views/productos/rutas.js'

dotenv.config({patch: './.env'})
const app = Express() // Crea servidor 

app.use(Cors()) // soluciona error de cors de la consola del front
app.use(Express.json()) // Convierte las solicitudes entrantes en formato json en un objeto manipulable 
app.use(rutasUsuarios)
app.use(rutasProductos)

const main = () => {
    return app.listen(process.env.PORT, () =>{ // Establece el puerto de escucha de solicitudes
    console.log(`Escuchando puerto ${process.env.PORT}`)
    })
}

conectarBD(main)