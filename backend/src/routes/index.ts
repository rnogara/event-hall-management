import { Router } from 'express';
import eventRouter from './event.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/events', eventRouter);
router.use('/', userRouter);

export default router;