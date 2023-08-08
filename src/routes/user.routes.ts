import { Router } from 'express';
import { UserController } from '../controllers';
import Validations from '../middlewares/Validations';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req, res) => userController.login(req, res),
);
router.get(
  '/inscribed',
  Validations.validateToken,
  (req, res) => userController.getInscribed(req, res),
);
router.post(
  '/inscribed/:id',
  Validations.validateToken,
  (req, res) => userController.inscribe(req, res),
);

export default router;