import express from 'express';

import {
  index,
  show,
  createMateriaAprobada,
  updateMateriaAprobada,
  deleteMateriaAprobada,
} from '../controllers/materia_aprobada_controller';
import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/', withErrorHandling(index));
router.get('/:id', withErrorHandling(show));
router.post('/', withErrorHandling(createMateriaAprobada));

router.put('/:id', withErrorHandling(updateMateriaAprobada));

router.delete('/:id', withErrorHandling(deleteMateriaAprobada));

export default router;
