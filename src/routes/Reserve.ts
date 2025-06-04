import { Router, RequestHandler } from 'express';
import { add, getall, getpassed, getnotpassed, getwaiting } from '../controllers/ReservationController';

const router = Router();

router.post('/reserve/add', add as RequestHandler);
router.get('/reserve/all', getall as RequestHandler);
router.get('/reserve/passed', getpassed as RequestHandler);
router.get('/reserve/notpassed', getnotpassed as RequestHandler);
router.get('/reserve/waiting', getwaiting as RequestHandler);

export default router;