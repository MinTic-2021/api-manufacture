import Express from 'express'
import { conectarBD } from './db/db.js'
import dotenv from 'dotenv'
import Cors from 'cors'
import rutasUsuarios from './views/usuarios/rutas.js'
import rutasVentas from './views/ventas/rutasVentas.js'
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

dotenv.config({patch: './.env'})
const app = Express() // Crea servidor 

app.use(Cors()) // soluciona error de cors de la consola del front

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://mintinc-manufacture.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'api-autenticacion-manufacture',
  issuer: 'https://mintinc-manufacture.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck)
app.use(Express.json()) // Convierte las solicitudes entrantes en formato json en un objeto manipulable 
app.use(rutasUsuarios)
app.use(rutasVentas)

const main = () => {
    return app.listen(process.env.PORT, () =>{ // Establece el puerto de escucha de solicitudes
    console.log(`Escuchando puerto ${process.env.PORT}`)
    })
}

conectarBD(main)