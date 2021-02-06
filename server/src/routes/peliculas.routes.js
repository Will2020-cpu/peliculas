import { Router } from 'express'
import * as peliculasController from '../controller/Peliculas.controller'
import * as verificando from '../middlewares/authJwt'

const router = Router();


router.get('/', peliculasController.getPeliculas)
router.get('/:id',peliculasController.getPeliculaById)
router.post('/add',[verificando.verifyToken,verificando.verifyRol],peliculasController.addPelicula)
router.put('/edit/:id',[verificando.verifyToken,verificando.verifyRol],peliculasController.editPelicula)
router.delete('/delete/:id',[verificando.verifyToken,verificando.verifyRol],peliculasController.deletePeliculaById)



export default router;