import { Router } from 'express';
import userRouter from './user';
import invoiceRouter from './invoice';
import clientRouter from './client';


const router = Router()

// Declare different routing modules
router.use(userRouter)
router.use(invoiceRouter)
router.use(clientRouter)

export default router
