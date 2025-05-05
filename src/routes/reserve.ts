import { Router } from 'express';
import { all, create, waiting, pass, rejected, qualified, unQualified, deleteOne, deleted } from '../controllers/ReserveController';

const router = Router();
router.post('/add', create);
router.get('/all', all);
router.get('/waiting', waiting);
router.get('/pass', pass);
router.get('/rejected', rejected);
router.post('/delete', deleteOne);
router.delete('/delete', deleted);

// 之後要經由middleware驗證
router.post('/qualified', qualified);
router.post('/unqualified', unQualified);
export default router;