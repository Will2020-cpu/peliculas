import { Router } from 'express'
import * as authController from '../controller/auth.controller'
const router = Router();


router.post('/signin',authController.signin);
router.post('/signup',authController.signup);
router.post('/signup-admin',authController.signupAdmin)
router.get('/whoami',authController.whoami);

export default router
