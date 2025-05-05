import { Router } from 'express'
import { logout } from '../../controllers/AuthController'

const router = Router()
router.post('/logout', logout)
export default router