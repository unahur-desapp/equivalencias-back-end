import express from 'express';

import {
  index,
  show,
  addMateriaAprobada,
} from '../controllers/materia_aprobada_controller';
import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/', withErrorHandling(index));
router.get('/:id', withErrorHandling(show));
router.post('/', withErrorHandling(addMateriaAprobada));

export default router;
