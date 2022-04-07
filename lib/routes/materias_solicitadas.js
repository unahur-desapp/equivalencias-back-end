import express from 'express';

import {
  addMateriaSolicitada,
  index,
  show,
} from '../controllers/materia_solicitada_controller';
import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/', withErrorHandling(index));
router.get('/:id', withErrorHandling(show));

router.post('/', withErrorHandling(addMateriaSolicitada));

export default router;
