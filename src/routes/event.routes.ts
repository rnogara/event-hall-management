import { Router } from 'express';
import { EventController } from '../controllers';
import Validations from '../middlewares/Validations';

const eventController = new EventController();

const router = Router();

router.patch(
  '/:id',
  Validations.validateToken,
  (req, res) => eventController.updateEvent(req, res),
);
router.delete(
  '/:id',
  Validations.validateToken,
  (req, res) => eventController.deleteEvent(req, res),
);
router.get('/', (req, res) => eventController.getEvents(req, res));
router.post(
  '/',
  Validations.validateToken,
  Validations.validateEventCreate,
  (req, res) => eventController.createEvent(req, res),
);

export default router;