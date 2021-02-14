import express from 'express'
import morgan from 'morgan'
import Informacion from '../package.json';
import helmet from "helmet"
import "core-js/stable";
import "regenerator-runtime/runtime";

//Importando rutas
import peliculasRoutes from './routes/peliculas.routes'
import authRoutes from './routes/auth.routes'

const app = express()



//Configuraciones
app.set('port',process.env.PORT || 5000)


app.set('informacion',Informacion);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/',(req,res)=>{
    res.json({
        author:app.set('informacion').author,
        description: app.set('informacion').description
    })
})


app.use('/api/peliculas',peliculasRoutes)
app.use('/api/auth',authRoutes)

export default app;

